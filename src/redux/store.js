import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal.js";
import { waterReducer } from "./dailyInfoSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    water: waterReducer,
  },
});
