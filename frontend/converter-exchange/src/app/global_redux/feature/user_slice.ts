'use client';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  refreshtoken: string;
}

const getInitialUserState = (): UserState => {
  if (typeof localStorage !== "undefined") {
    const persistedState = localStorage.getItem("userState");
    if (persistedState) {
      return JSON.parse(persistedState);
    }
  }
  return { _id: "", email: "", firstName: "", lastName: "", token: "", refreshtoken: "" };
};

export const userSlice = createSlice({
  name: "userdetails",
  initialState: getInitialUserState(),
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserState>) => {
      const newState = {
        ...state,
        _id: action.payload._id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        token: action.payload.token,
        refreshtoken: action.payload.refreshtoken,
      };
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("userState", JSON.stringify(newState));
      }
      return newState;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
