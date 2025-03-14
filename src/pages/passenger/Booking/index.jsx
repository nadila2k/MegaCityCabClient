import { Box, Button, TextField, Typography } from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import { useState, useEffect } from "react";
import ModalUi from "../../../components/ModalUi";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { createBookingThunk } from "../../../store/thunks/bookingThunk";

const generateRandomDistance = () => {
  return (Math.random() * 100 + 1).toFixed(1);
};

const Booking = () => {
  const dispatch = useDispatch();
  const transportOptions = useSelector(
    (state) => state.vehicleType.vehicleTypes || []
  );
  const { status, error } = useSelector((state) => state.booking || {});

  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    date: null,
    pickupLocation: "",
    destinationLocation: "",
    totalDistanceKM: "",
    pricePerKM: "",
    vehicleType: null,
  });

  const handleClickOpen = () => {
    setFormState({
      date: null,
      pickupLocation: "",
      destinationLocation: "",
      totalDistanceKM: generateRandomDistance(),
      pricePerKM: "",
      vehicleType: null,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare booking data
    const bookingData = {
      date: formState.date ? dayjs(formState.date).format("YYYY-MM-DD") : null,
      pickupLocation: formState.pickupLocation,
      destinationLocation: formState.destinationLocation,
      totalDistanceKM: parseFloat(formState.totalDistanceKM),
      pricePerKM: parseFloat(formState.pricePerKM),
      vehicleTypeId: formState.vehicleType,
    };

    try {
      await dispatch(createBookingThunk(bookingData)).unwrap();
      handleClose();
    } catch (err) {
      console.error("Booking creation failed:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormState((prevState) => ({
      ...prevState,
      date,
    }));
  };

  const handleTransportSelect = (transport) => {
    setFormState((prevState) => ({
      ...prevState,
      vehicleType: transport.id,
      pricePerKM: transport.price.toString(),
    }));
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title="Booking" />
        <Button variant="contained" onClick={handleClickOpen}>
          Create New Booking
        </Button>
      </Box>

      {/* Display booking status */}
      {status === "pending" && <Typography>Loading...</Typography>}
      {status === "failed" && (
        <Typography color="error">Error: {error}</Typography>
      )}

      <ModalUi
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title="New Booking"
      >
        <Box mt={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={formState.date}
              onChange={handleDateChange}
              minDate={dayjs()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  fullWidth
                  error={!formState.date}
                  helperText={!formState.date && "Date is required"}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            name="pickupLocation"
            label="Pickup Location"
            type="text"
            fullWidth
            value={formState.pickupLocation}
            onChange={handleChange}
            required
            // error={!formState.pickupLocation}
            // helperText={!formState.pickupLocation && "Pickup location is required"}
          />
          <TextField
            margin="dense"
            name="destinationLocation"
            label="Destination Location"
            type="text"
            fullWidth
            value={formState.destinationLocation}
            onChange={handleChange}
            required
            // error={!formState.destinationLocation}
            // helperText={!formState.destinationLocation && "Destination is required"}
          />
          <TextField
            margin="dense"
            name="totalDistanceKM"
            label="Total Distance (KM)"
            type="number"
            fullWidth
            value={formState.totalDistanceKM}
            onChange={handleChange}
            disabled
          />
          <TextField
            margin="dense"
            name="pricePerKM"
            label="Price per KM"
            type="number"
            fullWidth
            value={formState.pricePerKM}
            onChange={handleChange}
            disabled
          />

          <Typography variant="subtitle1" mt={2}>
            Select Transport:
          </Typography>
          {transportOptions.length > 0 ? (
            <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
              {transportOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={
                    formState.vehicleType === option.id
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => handleTransportSelect(option)}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <img
                    src={option.imageUrl}
                    alt={option.name}
                    style={{ width: 30, height: 30 }}
                  />
                  {option.name} (${option.price}/KM)
                </Button>
              ))}
            </Box>
          ) : (
            <Typography>No transport options available.</Typography>
          )}
        </Box>
      </ModalUi>
    </>
  );
};

export default Booking;
