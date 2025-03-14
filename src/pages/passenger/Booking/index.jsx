import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Badge,
} from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import ModalUi from "../../../components/ModalUi";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { createBookingThunk } from "../../../store/thunks/bookingThunk";
import axios from "axios";

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
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorBookings, setErrorBookings] = useState(null);

  // Fetch passenger bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/booking/get/bookings/passenger",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBookings(response.data.data);
        setLoadingBookings(false);
      } catch (err) {
        setErrorBookings(err.message);
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, []);

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
      const response = await axios.get(
        "http://localhost:8080/api/v1/booking/get/bookings/passenger",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings(response.data.data);
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

  // Function to get badge color based on status
  const getStatusBadge = (status) => {
    let badgeColor;
    switch (status) {
      case "ACTIVE":
        badgeColor = "#4caf50"; // Green
        break;
      case "DRIVERCONFIRMED":
        badgeColor = "#1976d2"; // Blue
        break;
      case "COMPLETED":
        badgeColor = "#388e3c"; // Dark Green
        break;
      case "CANCELLEDBYDRIVER":
        badgeColor = "#f44336"; // Red
        break;
      case "ONGOING":
        badgeColor = "#0288d1"; // Light Blue
        break;
      default:
        badgeColor = "#757575"; // Grey for unknown
    }
    return (
      <Badge
        badgeContent={status}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: badgeColor,
            color: "white",
            padding: "4px 8px",
            borderRadius: "12px",
          },
        }}
      />
    );
  };

  // Function to format date
  const formatDate = (dateString) => {
    return dayjs(dateString).format("YYYY-MM-DD");
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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

      {/* Bookings Table */}
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Your Bookings
        </Typography>
        {loadingBookings ? (
          <Typography>Loading bookings...</Typography>
        ) : errorBookings ? (
          <Typography color="error">Error: {errorBookings}</Typography>
        ) : bookings.length === 0 ? (
          <Typography>No bookings found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Pickup Location</TableCell>
                  <TableCell>Destination Location</TableCell>
                  <TableCell>Distance (KM)</TableCell>
                  <TableCell>Price/KM</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Vehicle Type</TableCell>
                  <TableCell>Passenger</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{formatDate(booking.date)}</TableCell>
                    <TableCell>{booking.pickupLocation}</TableCell>
                    <TableCell>{booking.destinationLocation}</TableCell>
                    <TableCell>{booking.totalDistanceKM}</TableCell>
                    <TableCell>Rs. {booking.pricePerKM}</TableCell>
                    <TableCell>Rs. {booking.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(booking.bookingStatus)}</TableCell>
                    <TableCell>{booking.vehicleType.name}</TableCell>
                    <TableCell>
                      {booking.passenger.firstName} {booking.passenger.lastName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Booking Creation Modal */}
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