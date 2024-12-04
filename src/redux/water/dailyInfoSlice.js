import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  fetchWaterRecords,
  addWaterRecord,
  deleteWaterRecord,
  updateWaterRecord,
  apiWaterMonth,
} from "./dailyInfoThunk";

const dailyInfoSlice = createSlice({
  name: "dailyInfo",
  initialState: {
    records: [],
    loading: false,
    error: null,
    editingRecord: null,
    recordToDelete: null,

    waterInfoMonth: [],
    waterInfoDay: {},
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
      })

      // waterInfo for the month
      // .addCase(apiWaterMonth.pending, (state) => { })
      .addCase(apiWaterMonth.fulfilled, (state, { payload }) => {
        state.waterInfoMonth = payload;
      })
    // .addCase(apiWaterMonth.rejected, (state) => { })


  },
});


export const {
  addWater,
  updateWater,
  deleteWater,
  setEditingRecord,
  setRecordToDelete,
} = dailyInfoSlice.actions;

const selectWaterInfoMonth = state => state.water.waterInfoMonth;

export const selectDailyWaterData = createSelector(
  [selectWaterInfoMonth],
  (waterInfoMonth) => waterInfoMonth.reduce((acc, item) => {
    const date = new Date(item.date).getDate(); // Отримуємо день із дати
    acc[date] = (acc[date] || 0) + item.amount; // Сумуємо кількість води
    return acc;
  }, {}));

export default dailyInfoSlice.reducer;
