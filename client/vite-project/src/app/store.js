import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { courseApi } from "@/features/courseApi";
import { authApi } from "@/features/api/authApi.js";

export const appStore=configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=> defaultMiddleware().concat(authApi.middleware,courseApi.middleware)
})
