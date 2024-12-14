import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  fetchWaterRecords,
  addWaterRecord,
  deleteWaterRecord,
  updateWaterRecord,
  apiWaterMonth,
  apiWaterDay,
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
    waterInfoDay: [],
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

      .addCase(addWaterRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWaterRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(addWaterRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteWaterRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.waterInfoDay = state.waterInfoDay.filter(
          (record) => record._id !== action.payload
        );
      })
      .addCase(deleteWaterRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateWaterRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWaterRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex(
          (record) => record.id === action.payload.id
        );
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      })
      .addCase(updateWaterRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(apiWaterMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiWaterMonth.fulfilled, (state, { payload }) => {
        state.waterInfoMonth = payload;
      })
      .addCase(apiWaterMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(apiWaterDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiWaterDay.fulfilled, (state, { payload }) => {
        state.waterInfoDay = payload;
      })
      .addCase(apiWaterDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

export const selectWaterInfoMonth = (state) => state.water.waterInfoMonth;
export const selectWaterInfoDay = (state) => state.water.waterInfoDay;
export const selectLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;

export const selectDailyWaterData = createSelector(
  [selectWaterInfoMonth],
  (waterInfoMonth) =>
    waterInfoMonth.reduce((acc, item) => {
      const date = new Date(item.date).getDate(); // Отримуємо день із дати
      acc[date] = (acc[date] || 0) + item.amount; // Сумуємо кількість води
      return acc;
    }, {})
);

export default dailyInfoSlice.reducer;
