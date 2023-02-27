import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    }
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
