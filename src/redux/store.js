// import { configureStore } from "@reduxjs/toolkit";
// import { modalReducer } from "./modal.js";

// import { waterReducer } from "./dailyInfoSlice";

// import { authReducer } from "./auth/slice.js";

// export const store = configureStore({
//   reducer: {
//     modal: modalReducer,

//     water: waterReducer,

//     auth: authReducer,

//   },
// });
import { modalReducer } from "./modal.js";
import { waterReducer } from "./dailyInfoSlice";

import { authReducer } from "./auth/slice.js";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import {authReducer} from "./auth/";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    water: waterReducer,

    // auth: authReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
