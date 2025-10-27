import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["profile/addProfilePicture"],
        ignoredPaths: ["profile.profilePictures"],
      },
    }),
});

export default store;
