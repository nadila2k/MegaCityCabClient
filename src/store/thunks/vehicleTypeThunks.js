import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiConfig";

// export const vehicleTypeListThunk = createAsyncThunk(
//   "auth/sign_in",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`vehicle/list`);
//       return response;
//     } catch (error) {
//       rejectWithValue(error.message);
//     }
//   }
// );

export const vehicleTypeListThunk = createAsyncThunk(
  "vehicle/list", 
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.get(`vehicle/list`);
      // return response;

      const response = await fetch(`http://localhost:5173/vehicles.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);