import { createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../../constants/app.constants";
import { signUpThunk } from "../thunks/authThunks";

const initialState = {
  isAuthenticated: false,
  user: null,
  status: REDUX_STATUS.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.status = REDUX_STATUS.PENDING;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.userData;
        state.status = REDUX_STATUS.SUCCEEDED;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = REDUX_STATUS.FAILED;
        localStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;
