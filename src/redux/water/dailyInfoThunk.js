import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { INSTANCE } from "../auth/operations.js";

const API_URL = "https://final-project-mobileteam-backend.onrender.com/water";

const setAuthHeaders = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const fetchWaterRecords = createAsyncThunk(
  "dailyInfo/fetchWaterRecords",
  async (date, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) throw new Error("Authorization token is missing");

      setAuthHeaders(token);

      if (!date) throw new Error("Date parameter is required");

      const response = await axios.get(`${API_URL}/day/${date}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch water records by day"
      );
    }
  }
);

export const addWaterRecord = createAsyncThunk(
  "dailyInfo/addWaterRecord",
  async (payload, thunkAPI) => {
    try {
      const { fullDate, date, amount } = payload;
      const updatefullDate = new Date(`${fullDate}T${date}:00`);
      // updatefullDate.setHours(updatefullDate.getHours() + 2);

      const hours = String(updatefullDate.getHours()).padStart(2, "0");
      const minutes = String(updatefullDate.getMinutes()).padStart(2, "0");
      const seconds = String(updatefullDate.getSeconds()).padStart(2, "0");

      const updatedDate = `${updatefullDate
        .toISOString()
        .slice(0, 10)}T${hours}:${minutes}:${seconds}`;

      const newData = { date: updatedDate, amount };

      const { data } = await INSTANCE.post("/water", newData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to add water record"
      );
    }
  }
);

export const deleteWaterRecord = createAsyncThunk(
  "dailyInfo/deleteWaterRecord",
  async (id, thunkAPI) => {
    try {
      const { data } = await INSTANCE.delete(`water/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete water record"
      );
    }
  }
);

export const updateWaterRecord = createAsyncThunk(
  "dailyInfo/updateWaterRecord",
  async ({ id, fullDate, time, amount }, thunkAPI) => {
    try {
      const updatefullDate = new Date(`${fullDate}T${time}:00`);
      // updatefullDate.setHours(updatefullDate.getHours() + 2);

      const hours = String(updatefullDate.getHours()).padStart(2, "0");
      const minutes = String(updatefullDate.getMinutes()).padStart(2, "0");
      const seconds = String(updatefullDate.getSeconds()).padStart(2, "0");

      const updatedDate = `${updatefullDate
        .toISOString()
        .slice(0, 10)}T${hours}:${minutes}:${seconds}`;

      const newData = { date: updatedDate, amount };

      const { data } = await INSTANCE.patch(`water/${id}`, newData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update water record"
      );
    }
  }
);

export const apiWaterMonth = createAsyncThunk(
  "water/month",
  async (date, thunkApi) => {
    try {
      const { data } = await INSTANCE.get(`water/month/${date}`);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiWaterDay = createAsyncThunk(
  "water/day",
  async (date, thunkApi) => {
    try {
      const { data } = await INSTANCE.get(`water/day/${date}`);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
