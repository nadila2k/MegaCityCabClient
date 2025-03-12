import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiConfig";
import { ROLES } from "../../constants/app.constants";

export const signUpThunk = createAsyncThunk(
  "auth/sign_up",
  async (formData, { rejectWithValue }) => {
    try {
      const role = formData.roles;
      const appendUrl = role === ROLES.PASSENGER ? "passenger" : "driver";
      const URL = `/auth/sign-up/${appendUrl}`;
      const response = await axiosInstance.post(URL, formData);
      return response;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
