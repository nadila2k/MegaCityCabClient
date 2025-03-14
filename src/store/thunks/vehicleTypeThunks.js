import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiConfig";

export const vehicleTypeListThunk = createAsyncThunk(
  "vehicle/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`vehicle/all/vehicles`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// export const vehicleTypeCreateThunk = createAsyncThunk(
//   "vehicle/create",
//   async ({ name, price, image }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
      
//       const vehicleTypeRequest = {
//         name,
//         price,
//       };
      
//       formData.append("vehicleTypeRequest", JSON.stringify(vehicleTypeRequest));
      
//       if (image) {
//         formData.append("image", image);
//       }

//       const response = await axiosInstance.post(`vehicle/create`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // const response = await axiosInstance.post(`vehicle/create`, formData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const vehicleTypeCreateThunk = createAsyncThunk(
  "vehicle/create",
  async ({ name, price, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      // Append fields directly to FormData
      formData.append("name", name);
      formData.append("price", price);
      
      if (image) {
        formData.append("image", image);
      }

      const response = await axiosInstance.post(`vehicle/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);