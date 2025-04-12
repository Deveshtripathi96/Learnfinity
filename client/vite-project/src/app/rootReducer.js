import { combineReducers } from "@reduxjs/toolkit";
import { courseApi } from "@/features/courseApi";

const rootReducer = combineReducers({
    [courseApi.reducerPath]: courseApi.reducer
});
export default rootReducer;