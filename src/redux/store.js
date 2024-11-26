import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal.js";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
