import { combineReducers } from "@reduxjs/toolkit";
import { courseApi } from "@/features/courseApi";

import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";

const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    auth:authReducer
})

export default rootReducer;