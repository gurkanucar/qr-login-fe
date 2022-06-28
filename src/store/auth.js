import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      isLoggedIn: false,
      loggedInError: "",
    },
  },
  reducers: {
    login: (state, action) => {
      if (
        action.payload.username === "grkn" &&
        action.payload.password === "pass"
      ) {
        state.value = { isLoggedIn: true, loggedInError: "" };
        console.log("login successfull", state.value.isLoggedIn);
      } else {
        state.value = {
          isLoggedIn: false,
          loggedInError: "Username or Password is wrong!",
        };
        console.log(
          "Username or Password is wrong!",
          state.value.loggedInError
        );
      }
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
