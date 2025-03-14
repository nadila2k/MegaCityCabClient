import { createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../../constants/app.constants";
import {
  vehicleTypeCreateThunk,
  vehicleTypeListThunk,
} from "../thunks/vehicleTypeThunks";

const initialState = {
  bookings: [],
  status: REDUX_STATUS.IDLE,
  error: null,
};

const vehicleTypeSlice = createSlice({
  name: "vehicleType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(vehicleTypeListThunk.pending, (state) => {
      //   state.status = REDUX_STATUS.PENDING;
      // })
      // .addCase(vehicleTypeListThunk.fulfilled, (state, action) => {
      //   state.bookings = action.payload;
      //   state.status = REDUX_STATUS.SUCCEEDED;
      // })
      // .addCase(vehicleTypeListThunk.rejected, (state, action) => {
      //   state.bookings = null;
      //   state.status = REDUX_STATUS.FAILED;
      // })
      // Create Vehicle Type
      .addCase(createBookingThunk.pending, (state) => {
        state.status = REDUX_STATUS.PENDING;
        state.error = null;
      })
      .addCase(createBookingThunk.fulfilled, (state, action) => {
        state.bookings = state.bookings
          ? [...state.bookings, action.payload]
          : [action.payload];
        state.status = REDUX_STATUS.SUCCEEDED;
      })
      .addCase(createBookingThunk.rejected, (state, action) => {
        state.status = REDUX_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export default vehicleTypeSlice.reducer;
