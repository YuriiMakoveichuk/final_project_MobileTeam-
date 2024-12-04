import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWaterRecords,
  addWaterRecord,
  deleteWaterRecord,
  updateWaterRecord,
} from "./dailyInfoThunk";

const dailyInfoSlice = createSlice({
  name: "dailyInfo",
  initialState: {
    records: [],
    loading: false,
    error: null,
    editingRecord: null,
    recordToDelete: null, 
  },
  reducers: {
    addWater: (state, action) => {
      state.records.push(action.payload);
    },
    updateWater: (state, action) => {
      const index = state.records.findIndex(
        (record) => record.id === action.payload.id
      );
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    deleteWater: (state, action) => {
      state.records = state.records.filter(
        (record) => record.id !== action.payload
      );
    },
    setEditingRecord: (state, action) => {
      state.editingRecord = action.payload;
    },
    setRecordToDelete: (state, action) => {
      state.recordToDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchWaterRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addWaterRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.records = state.records.filter(
          (record) => record.id !== action.payload
        );
      })
      .addCase(updateWaterRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex(
          (record) => record.id === action.payload.id
        );
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      });
  },
});


export const {
  addWater,
  updateWater,
  deleteWater,
  setEditingRecord,
  setRecordToDelete,
} = dailyInfoSlice.actions;

export default dailyInfoSlice.reducer;
