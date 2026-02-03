import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/userActions";
import { UserState, UserProfile } from "../../interfaces/userInterface";


export const login = createAsyncThunk("login", async (payload: any) => {
  const data = await loginUser(payload);
  return data;
});

export const register = createAsyncThunk("register", async (payload: any) => {
  const data = await registerUser(payload);
  return data;
});

export const userSlice = createSlice({
    name: "user",
    initialState: { isAuthenticated: false, token: null, userId: null, username: null } as UserState,
    reducers: {
        SetIsAutenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
            localStorage.setItem("isAuthenticated", action.payload.toString());
        },
        SetToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem("token", action.payload);
            } else {
                localStorage.removeItem("token");
            }
        },
        SetUserId: (state, action: PayloadAction<number | null>) => {
            state.userId = action.payload;
        },
        SetUsername: (state, action: PayloadAction<string | null>) => {
            state.username = action.payload;
        },
        SetUserProfile: (
            state,
            action: PayloadAction<UserProfile | null>,
        ) => {
            if (action.payload) {
                state.userId = action.payload.userId;
                state.username = action.payload.username;
            } else {
                state.userId = null;
                state.username = null;
            }
        },
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
            .addCase(login.fulfilled, (state, action: any) => {
                const payload = action.payload ?? {};

                const token = payload.token ?? payload.accessToken ?? null;
                const userId = payload.userId ?? payload.user?.id ?? payload.id ?? null;
                const username =
                    payload.username ?? payload.user?.username ?? payload.user?.name ?? null;

                state.isAuthenticated = true;
                localStorage.setItem("isAuthenticated", "true");

                state.token = token;
                if (token) {
                    localStorage.setItem("token", token);
                }

                state.userId = userId;

                state.username = username;
            })
            .addCase(register.fulfilled, (state, action: any) => {
                const payload = action.payload ?? {};

                const token = payload.token ?? payload.accessToken ?? null;
                const userId = payload.userId ?? payload.user?.id ?? payload.id ?? null;
                const username =
                    payload.username ?? payload.user?.username ?? payload.user?.name ?? null;

                state.isAuthenticated = true;
                localStorage.setItem("isAuthenticated", "true");

                state.token = token;
                if (token) {
                    localStorage.setItem("token", token);
                }

                state.userId = userId;

                state.username = username;
            });
    },
});

export const { SetIsAutenticated, SetToken, SetUserId, SetUsername, SetUserProfile, logout } = userSlice.actions;

