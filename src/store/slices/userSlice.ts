import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const userSlice = createSlice({
    name: "user",
    initialState: { isAuthenticated: false, token: null as string | null },
    reducers: {
        SetIsAutenticated: (state, action) => {
            state.isAuthenticated = action.payload;
            localStorage.setItem("isAuthenticated", action.payload.toString());
        },
        SetToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("token");
        },
    }
})

export const login = createAsyncThunk("login", async (payload) => {
  const response = await axiosInstance.post("/login", payload);
  return response.data;
});

export const register = createAsyncThunk("register", async (payload) => {
  const response = await axiosInstance.post("/register", payload);
  return response.data;
});

