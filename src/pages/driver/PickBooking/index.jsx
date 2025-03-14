import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

const PickBooking = () => {
  const [bookingsPickup, setBookingsPickup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/booking/get/booking/driver",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBookingsPickup(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDateTime = (dateString) => {
    const dateObj = new Date(dateString);
    const date = dateObj.toISOString().split("T")[0];
    const time = dateObj.toTimeString().split(" ")[0]; 
    return { date, time };
  };

  // Function to get status icon and color
  const getStatusIcon = (status) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircleIcon sx={{ color: "#4caf50" }} />;
      case "PENDING":
        return <PendingIcon sx={{ color: "#ff9800" }} />;
      case "CANCELLED":
        return <CancelIcon sx={{ color: "#f44336" }} />;
      case "DRIVERCONFIRMED":
        return <CheckCircleIcon sx={{ color: "#1976d2" }} />; 
      default:
        return null;
    }
  };

  // Handle pickup button click to update status
  const handlePickup = async (booking) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/booking/update/${booking.id}/driver?bookingStatus=DRIVERCONFIRMED`,
        null, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local state to reflect the new status
      setBookingsPickup((prevBookings) =>
        prevBookings.map((b) =>
          b.id === booking.id ? { ...b, bookingStatus: "DRIVERCONFIRMED" } : b
        )
      );

      console.log(`Booking ID ${booking.id} updated to DRIVERCONFIRMED`);
    } catch (err) {
      console.error(`Failed to update booking ID ${booking.id}:`, err.message);
      setError(`Failed to update booking: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <PageTitle title="Pick Bookings" />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <PageTitle title="Pick Bookings" />
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageTitle title="Pick Bookings" />

      <Grid container spacing={3} mt={3}>
        {bookingsPickup.map((booking) => {
          const { date, time } = formatDateTime(booking.date);
          const totalPrice = booking.totalPrice.toFixed(2);
          const customerName = `${booking.passenger.firstName} ${booking.passenger.lastName}`;

          return (
            <Grid item xs={12} sm={6} key={booking.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    {getStatusIcon(booking.bookingStatus)}
                    <Typography variant="h6" ml={1}>
                      {booking.bookingStatus}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <EventIcon sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">{date}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <AccessTimeIcon sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">{time}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <PersonIcon sx={{ mr: 1, color: "#7b1fa2" }} />
                    <Typography variant="body1">
                      <strong>Customer:</strong> {customerName}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon sx={{ mr: 1, color: "#d32f2f" }} />
                    <Typography variant="body1">
                      <strong>Pickup:</strong> {booking.pickupLocation}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon sx={{ mr: 1, color: "#d32f2f" }} />
                    <Typography variant="body1">
                      <strong>Destination:</strong> {booking.destinationLocation}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <MapIcon sx={{ mr: 1, color: "#0288d1" }} />
                    <Typography variant="body1">
                      <strong>Distance:</strong> {booking.totalDistanceKM} KM
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <PaidIcon sx={{ mr: 1, color: "#388e3c" }} />
                    <Typography variant="body1">
                      <strong>Price/KM:</strong> Rs. {booking.pricePerKM}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    <PaidIcon sx={{ mr: 1, color: "#388e3c" }} />
                    <Typography variant="body1">
                      <strong>Total Price:</strong> Rs. {totalPrice}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePickup(booking)}
                    fullWidth
                    disabled={booking.bookingStatus === "DRIVERCONFIRMED"}
                  >
                    Pickup
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PickBooking;