import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal.js";
import { authReducer } from "./auth/slice.js";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
});
