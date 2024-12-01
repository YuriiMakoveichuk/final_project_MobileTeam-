import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const INSTANCE = axios.create({
  baseURL: "https://final-project-mobileteam-backend.onrender.com/",
});

const setAuthHeaders = (token) => {
  INSTANCE.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Login user

export const apiLogin = createAsyncThunk(
  'auth/login',
  async (credentials, thunkApi) => {
    try {
      const response = await INSTANCE.post('/user/login', credentials);
      const token = response.data?.data?.accessToken;
      const user = response.data?.data?.user;
      setAuthHeaders(token);
      return { token, user };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
export const registration = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const loginResponse = await INSTANCE.post("/user/login", credentials);
      console.log("register", loginResponse);
      const token = loginResponse.data?.data?.accessToken;
      setAuthHeaders(token);
      return { token, user: credentials.email };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Logout user
export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await INSTANCE.post("user/logout");
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
