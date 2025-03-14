import { createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../../constants/app.constants";
import {
  vehicleTypeCreateThunk,
  vehicleTypeListThunk,
} from "../thunks/vehicleTypeThunks";

const initialState = {
  vehicleTypes: null,
  status: REDUX_STATUS.IDLE,
  error: null,
};

const vehicleTypeSlice = createSlice({
  name: "vehicleType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vehicleTypeListThunk.pending, (state) => {
        state.status = REDUX_STATUS.PENDING;
      })
      .addCase(vehicleTypeListThunk.fulfilled, (state, action) => {
        state.vehicleTypes = action.payload;
        state.status = REDUX_STATUS.SUCCEEDED;
      })
      .addCase(vehicleTypeListThunk.rejected, (state, action) => {
        state.vehicleTypes = null;
        state.status = REDUX_STATUS.FAILED;
      })
      // Create Vehicle Type
      .addCase(vehicleTypeCreateThunk.pending, (state) => {
        state.status = REDUX_STATUS.PENDING;
        state.error = null;
      })
      .addCase(vehicleTypeCreateThunk.fulfilled, (state, action) => {
        state.vehicleTypes = state.vehicleTypes
          ? [...state.vehicleTypes, action.payload]
          : [action.payload];
        state.status = REDUX_STATUS.SUCCEEDED;
      })
      .addCase(vehicleTypeCreateThunk.rejected, (state, action) => {
        state.status = REDUX_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export default vehicleTypeSlice.reducer;
