import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal.js";

import { waterReducer } from "./dailyInfoSlice";

import { authReducer } from "./auth/slice.js";

export const store = configureStore({
  reducer: {
    modal: modalReducer,

    water: waterReducer,

    auth: authReducer,
  },
});
