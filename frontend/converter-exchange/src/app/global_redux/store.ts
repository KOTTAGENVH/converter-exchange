"use client";
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userReducer from './feature/user_slice';
import drawerReducer from './feature/drawe_slice';

// Custom storage for client-side
const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['result'], 
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);
const drawerPersistedReducer = persistReducer(persistConfig, drawerReducer);

const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    drawer: drawerPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
