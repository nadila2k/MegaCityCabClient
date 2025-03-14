import { Box, Button, TextField, Typography } from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import { useState } from "react";
import ModalUi from "../../../components/ModalUi";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";

const generateRandomDistance = () => {
  return (Math.random() * 100 + 1).toFixed(1);
};

const Booking = () => {
  const transportOptions = useSelector(
    (state) => state.vehicleType.vehicleTypes || []
  );

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log("Form data submitted:", {
      ...formJson,
      date: formState.date,
      totalDistanceKM: formState.totalDistanceKM,
      pricePerKM: formState.pricePerKM,
      vehicleType: formState.vehicleType,
    });
    handleClose();
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
      date: date,
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
      <PageTitle title="Booking" />
      <Button variant="contained" onClick={handleClickOpen}>
        Create new Booking
      </Button>

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
              renderInput={(params) => (
                <TextField {...params} margin="dense" fullWidth />
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
          />
          <TextField
            margin="dense"
            name="destinationLocation"
            label="Destination Location"
            type="text"
            fullWidth
            value={formState.destinationLocation}
            onChange={handleChange}
          />
          {/* <TextField
            margin="dense"
            name="totalDistanceKM"
            label="Total Distance (KM)"
            type="number"
            fullWidth
            value={formState.totalDistanceKM}
            onChange={handleChange}
            disabled
          /> */}
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
                    src={option.image_url}
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
