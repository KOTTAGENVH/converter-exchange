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
  // Check if localStorage is available
  if (typeof localStorage !== "undefined") {
    const persistedState = localStorage.getItem("persistroot");
    if (persistedState) {
      console.log("JSON.parse(persistedState)", JSON.parse(persistedState));
      return JSON.parse(persistedState);
    }
  }

  // If localStorage is not available or persisted state doesn't exist, use the default initial state
  return {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    token: "",
    refreshtoken: "",
  };
};

export const userSlice = createSlice({
  name: "user-details",
  initialState: getInitialUserState(),
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        _id: action.payload._id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        token: action.payload.token,
        refreshtoken: action.payload.refreshtoken,
      };
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
