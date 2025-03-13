import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import libraryReducer from "./librarySlice";
import logger from "redux-logger";

// Store Configuration
const store = configureStore({
  reducer: {
    books: bookReducer,
    library: libraryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger), // Adds Redux Logger for debugging
  devTools: process.env.NODE_ENV !== "production", // Enables Redux DevTools in dev mode
});

// Export Store & Types
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
