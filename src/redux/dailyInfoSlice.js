import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [],
  editingRecord: null,
  recordToDelete: null,
};

const dailyInfoSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    //add records about water
    addWater: (state, action) => {
      state.records.push(action.payload);
    },

    setRecordToDelete: (state, action) => {
      state.recordToDelete = action.payload; 
    },

    //delete records about water
    deleteWater: (state, action) => {
      state.records = state.records.filter(
        (record) => record.id !== action.payload
      );
      state.recordToDelete = null;
    },
    // set edit
    setEditingRecord: (state, action) => {
      state.editingRecord = action.payload;
    },

    updateWater: (state, action) => {
      const { id, amount, time } = action.payload;
      const record = state.records.find((record) => record.id === id);
      if (record) {
        record.amount = amount;
        record.time = time;
      }

      state.editingRecord = null;
    },
  },
});

export const {
  addWater,
  deleteWater,
  setEditingRecord,
  updateWater,
  setRecordToDelete,
} = dailyInfoSlice.actions;
export const waterReducer = dailyInfoSlice.reducer;
