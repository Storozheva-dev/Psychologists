import { configureStore } from "@reduxjs/toolkit";

import { psychologistsReducer } from "./psychologist/slice";
import { favoritesReducer } from "./psychologist/slice.js";
import authReducer from "./auth/authSlice.js";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

export const store = configureStore({
  reducer: {
    psychologists: psychologistsReducer,
    favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
