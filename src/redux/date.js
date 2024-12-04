import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentSelectedDate: 'Today',
};

const dateSlice = createSlice({
    name: "date",
    initialState: INITIAL_STATE,
    reducers: {
        changeDate: (state, action) => {
            state.currentSelectedDate = action.payload;
        },
    },
});

export const selectCurrentSelectedDate = (state) => state.date.currentSelectedDate;

export const { changeDate } = dateSlice.actions;

export const dateReducer = dateSlice.reducer;
