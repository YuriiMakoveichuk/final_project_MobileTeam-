import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { INSTANCE } from "../auth/operations.js";

// Определение URL API
const API_URL = "https://final-project-mobileteam-backend.onrender.com/water";

// Функция для установки заголовков авторизации

const setAuthHeaders = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Получение записей воды

export const fetchWaterRecords = createAsyncThunk(
  "dailyInfo/fetchWaterRecords",
  async (date, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) throw new Error("Authorization token is missing");

      setAuthHeaders(token);

      if (!date) throw new Error("Date parameter is required");

      // Отправляем запрос с датой в пути
      const response = await axios.get(`${API_URL}/day/${date}`);
      return response.data.data; // Возвращаем только данные записей
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch water records by day"
      );
    }
  }
);

// Добавление новой записи воды

export const addWaterRecord = createAsyncThunk(
  "dailyInfo/addWaterRecord",
  async (id, thunkAPI) => {
    try {
      const { data } = await INSTANCE.post("water", id);
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

// export const addWaterRecord = createAsyncThunk(
//   "dailyInfo/addWaterRecord",
//   async (newRecord, thunkAPI) => {
//     console.log("test", newRecord);

//     try {
//       const state = thunkAPI.getState();
//       const token = state.auth.token;

//       if (!token) throw new Error("Authorization token is missing");

//       setAuthHeaders(token);

//       // Проверка параметров
//       if (!newRecord.amount || !newRecord.date) {
//         throw new Error("Amount and date are required");
//       }

//       // Преобразование даты в формат ISO 8601
//       const formattedDate = new Date(newRecord.date).toISOString();

//       const response = await axios.post(API_URL, {
//         amount: newRecord.amount,
//         date: formattedDate,
//       });

//       return response.data.data; // Возвращаем только данные записи

//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to add water record"
//       );
//     }
//   }
// );

// Удаление записи воды

export const deleteWaterRecord = createAsyncThunk(
  "dailyInfo/deleteWaterRecord",
  async (id, thunkAPI) => {
    try {
      await INSTANCE.delete(`water/${id}`);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to delete water record"
      );
    }
  }
);

// Обновление записи воды
export const updateWaterRecord = createAsyncThunk(
  "dailyInfo/updateWaterRecord",
  async ({ id, amount, time }, thunkAPI) => {
    // Используем _id вместо id
    try {
      console.log(id, amount, time);
      await INSTANCE.patch(`water/${id}`, { amount }); // як коректно передати час на бекенд?

      // const state = thunkAPI.getState();
      // const token = state.auth.token;

      // if (!token) throw new Error("Authorization token is missing");

      // // Проверка параметров
      // if (!updatedRecord.amount || !updatedRecord.date) {
      //   throw new Error("Amount and date are required");
      // }

      // setAuthHeaders(token);

      // // Преобразование даты в формат ISO 8601
      // const formattedDate = new Date(updatedRecord.date).toISOString();

      // const response = await axios.put(`${API_URL}/${_id}`, {
      //   amount: updatedRecord.amount,
      //   date: formattedDate,
      // });

      // return response.data.data; // Возвращаем обновлённые данные записи
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to update water record"
      );
    }
  }
);

// export const apiWaterMonth = async (date) => {
//   const response = await INSTANCE.get(`water/month/${date}`);
//   console.log(response)
//   // https://final-project-mobileteam-backend.onrender.com/water/month/2024-12
// }

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
