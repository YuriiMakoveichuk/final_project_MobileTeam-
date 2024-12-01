import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const INSTANCE = axios.create({
  baseURL: 'https://final-project-mobileteam-backend.onrender.com/',
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
);
