import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/Auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
