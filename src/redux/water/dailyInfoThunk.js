import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Определение URL API
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
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState(); 
      const token = state.auth.token; 

      console.log("Token:", token);

      setAuthHeaders(token); 

      const response = await axios.get(API_URL); 
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch water records"
      );
    }
  }
);


export const addWaterRecord = createAsyncThunk(
  "dailyInfo/addWaterRecord",
  async (newRecord, thunkAPI) => {
    try {
      const state = thunkAPI.getState(); 
      const token = state.auth.token; 

      setAuthHeaders(token); 

      const response = await axios.post(API_URL, newRecord); 
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add water record"
      );
    }
  }
);


export const deleteWaterRecord = createAsyncThunk(
  "dailyInfo/deleteWaterRecord",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState(); 
      const token = state.auth.token; 

      setAuthHeaders(token); 

      await axios.delete(`${API_URL}/${id}`); 
      return id; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete water record"
      );
    }
  }
);


export const updateWaterRecord = createAsyncThunk(
  "dailyInfo/updateWaterRecord",
  async ({ id, updatedRecord }, thunkAPI) => {
    try {
      const state = thunkAPI.getState(); 
      const token = state.auth.token; 

      setAuthHeaders(token); 

      const response = await axios.put(`${API_URL}/${id}`, updatedRecord); 
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update water record"
      );
    }
  }
);

