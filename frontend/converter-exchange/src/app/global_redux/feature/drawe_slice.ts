'use client';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
  status: boolean;
}

const getInitialDrawerState = (): DrawerState => {
  // Check if localStorage is available
  if (typeof localStorage !== "undefined") {
    const persistedState = localStorage.getItem("persistroot");
    if (persistedState) {
      return JSON.parse(persistedState);
    }
  }

  // If localStorage is not available or persisted state doesn't exist, use the default initial state
  return {
    status: false,
  };
};

export const drawerSlice = createSlice({
  name: "drawer-state",
  initialState: getInitialDrawerState(),
  reducers: {
    setDrawer: (state, action: PayloadAction<DrawerState>) => {
      return {
        ...state,
        status: action.payload.status,
      };
    },
  },
});

export const { setDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
