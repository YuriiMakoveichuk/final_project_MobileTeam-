import { createSlice } from "@reduxjs/toolkit";
import {
  apiLogout,
  refreshUser,
  apiLogin,
  registration,
  patchUser,
} from "./operations.js";

export const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
    gender: null,
    photo: null,
    waterNorm: null,
    sportHours: null,
    weight: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder

      // Login user

      .addCase(apiLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.data;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(registration.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        const { user, token } = action.payload || {};
        if (user && token) {
          state.user = user;
          state.token = token;
          state.isLoggedIn = true;
        }
        state.isLoading = false;
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(refreshUser.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })

      .addCase(patchUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(patchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(patchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout user
      .addCase(apiLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, (state) => {
        console.log("state", state);

        return INITIAL_STATE;
      })
      .addCase(apiLogout.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { resetError } = authSlice.actions;
export const authReducer = authSlice.reducer;
