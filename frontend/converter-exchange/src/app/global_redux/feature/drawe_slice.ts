'use client';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
  status: boolean;
}

const getInitialDrawerState = (): DrawerState => {
  if (typeof localStorage !== "undefined") {
    const persistedState = localStorage.getItem("drawerState");
    if (persistedState) {
      return JSON.parse(persistedState);
    }
  }
  return { status: false };
};

export const drawerSlice = createSlice({
  name: "drawer-state",
  initialState: getInitialDrawerState(),
  reducers: {
    setDrawer: (state, action: PayloadAction<DrawerState>) => {
      const newState = { ...state, status: action.payload.status };
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("drawerState", JSON.stringify(newState));
      }
      return newState;
    },
  },
});

export const { setDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
