import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
    baseURL: "https://final-project-mobileteam-backend.onrender.com/",
})

const setAuthHeaders = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};


// Logout user
export const apiLogout = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) => {
        try {
            await instance.post("user/logout");
            setAuthHeaders("");
            return;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
