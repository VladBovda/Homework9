import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/userActions";
import { UserState } from "../../interfaces/userState";

export const login = createAsyncThunk("login", async (payload: { username: string; password: string }) => {
  return await loginUser(payload);
});

export const register = createAsyncThunk("register", async (payload: { username: string; password: string }) => {
  return await registerUser(payload);
});

function handleAuthFulfilled(state: UserState, action: any) {
  const payload = action.payload ?? {};
  const token = payload.access_token ?? payload.token ?? payload.accessToken ?? null;
  const userId = payload.userId ?? payload.user?.id ?? payload.id ?? null;
  const username = payload.userName ?? payload.username ?? payload.user?.username ?? null;

  state.isAuthenticated = true;
  state.token = token;
  state.userId = userId;
  state.username = username;

  localStorage.setItem("isAuthenticated", "true");
  if (token) localStorage.setItem("token", token);
}

export const userSlice = createSlice({
  name: "user",
  initialState: { isAuthenticated: false, token: null, userId: null, username: null } as UserState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.username = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, handleAuthFulfilled);
  },
});

export const { logout } = userSlice.actions;

