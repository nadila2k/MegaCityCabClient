import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./slices/authSlice";
import vehicleTypeReducer from "./slices/vehicleTypeSlice";

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  vehicleType: vehicleTypeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["persist.register", "persist.rehydrate"],
      },
    }),
});

export const persistor = persistStore(store);
