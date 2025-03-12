import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiConfig";

export const signUpThunk = createAsyncThunk(
  "auth/sign_up",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("signUpThunk ", formData);
      const response = await axiosInstance.post(
        "/auth/sign-up/passenger",
        formData
      );
      return response;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
