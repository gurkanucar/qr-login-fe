import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      isLoggedIn: false,
      myToken: "",
    },
  },
  reducers: {
    login: (state, action) => {
      state.value.myToken = action.payload.myToken;
      state.value.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.value.myToken = "";
      state.value.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
