import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentSelectedDate: 'Today',
    currentSelectedFullDate:
        `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")
        }-${new Date().getDate().toString().padStart(2, "0")}`,
};

const dateSlice = createSlice({
    name: "date",
    initialState: INITIAL_STATE,
    reducers: {
        changeDate: (state, action) => {
            state.currentSelectedDate = action.payload;
        },
        changeFullDate: (state, action) => {
            state.currentSelectedFullDate = action.payload;
        }

    },
});

export const selectCurrentSelectedDate = (state) => state.date.currentSelectedDate;
export const selectCurrentSelectedFullDate = (state) => state.date.currentSelectedFullDate;

export const { changeDate, changeFullDate } = dateSlice.actions;

export const dateReducer = dateSlice.reducer;
