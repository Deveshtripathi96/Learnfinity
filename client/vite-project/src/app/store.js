import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { courseApi } from "@/features/api/courseApi";
import { authApi } from "@/features/api/authApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(authApi.middleware)
      .concat(courseApi.middleware),
});

// Async initializer to preload user

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();

