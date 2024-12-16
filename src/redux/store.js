import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use local storage as default
import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // State to persist
};

// Combine reducers (if you have multiple slices)
const rootReducer = combineReducers({
  user: userReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create persistor
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };
