import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const INSTANCE = axios.create({
  baseURL: "https://final-project-mobileteam-backend.onrender.com/",
});

const setAuthHeaders = (token) => {
  INSTANCE.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiLogin = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await INSTANCE.post("user/login", credentials);

      const token = data?.data?.accessToken;

      setAuthHeaders(token);
      return { token, data };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const registration = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const registrationResponse = await INSTANCE.post(
        "/user/register",
        credentials
      );
      const userData = registrationResponse.data;

      const loginResponse = await INSTANCE.post("/user/login", credentials);
      const token = loginResponse.data?.data?.accessToken;
      setAuthHeaders(token);
      return { token, user: userData };
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return thunkApi.rejectWithValue(
          "User already exists. Redirecting to login..."
        );
      }
      if (error.response && error.response.status === 500) {
        return thunkApi.rejectWithValue(
          "Server error. Please try again later."
        );
      }
      return thunkApi.rejectWithValue(
        "Unexpected error. Please check your internet connection."
      );
    }
  }
);

export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const response = await INSTANCE.post("/user/logout");
      console.log("Logout response:", response);
      setAuthHeaders("");
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setAuthHeaders(token);

      const { data } = await INSTANCE.get("user/info");

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (token) return true;
      return false;
    },
  }
);

export const patchUser = createAsyncThunk(
  "auth/patchUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await INSTANCE.patch("user", formData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
