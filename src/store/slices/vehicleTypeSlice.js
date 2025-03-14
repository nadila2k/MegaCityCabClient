import { createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../../constants/app.constants";
import { vehicleTypeListThunk } from "../thunks/vehicleTypeThunks";

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
        console.log(
          "s"
        );
        
        state.status = REDUX_STATUS.PENDING;
      })
      .addCase(vehicleTypeListThunk.fulfilled, (state, action) => {
        state.vehicleTypes = action.payload;
        state.status = REDUX_STATUS.SUCCEEDED;
      })
      .addCase(vehicleTypeListThunk.rejected, (state, action) => {
        state.vehicleTypes = null;
        state.status = REDUX_STATUS.FAILED;
      });
  },
});

export default vehicleTypeSlice.reducer;
