import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import exhibitSlice from "./slices/exhibitSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        exhibit: exhibitSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;