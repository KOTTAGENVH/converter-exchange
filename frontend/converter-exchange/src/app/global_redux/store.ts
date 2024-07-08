"use client";
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './feature/user_slice';
import drawerReducer from './feature/drawe_slice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['result'], 
};

const userpersistedReducer = persistReducer(persistConfig, userReducer);
const drawerPersistedReducer = persistReducer(persistConfig, drawerReducer);

const store = configureStore({
  reducer: {
    user: userpersistedReducer,
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
