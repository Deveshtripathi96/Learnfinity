import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { courseApi } from "@/features/courseApi";


export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(courseApi.middleware)

})

