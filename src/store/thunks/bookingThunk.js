import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiConfig";

export const createBookingThunk = createAsyncThunk(
  "booking/create",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("booking/create", bookingData);
      console.log("createBookingThunk ", response);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);