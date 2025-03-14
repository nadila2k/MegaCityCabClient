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

const Home = () => {
  const [dashboardData, setDashboardData] = useState(() => {
    const storedData = localStorage.getItem("dashboardData");
    return storedData
      ? JSON.parse(storedData)
      : { completedTours: 0, totalEarnings: 0 };
  });
  const [ongoingBooking, setOngoingBooking] = useState(() => {
    const storedBooking = localStorage.getItem("ongoingBooking");
    return storedBooking ? JSON.parse(storedBooking) : null;
  });
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [loadingOngoing, setLoadingOngoing] = useState(true);
  const [error, setError] = useState(null);
  const [showOngoingTrip, setShowOngoingTrip] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(() => {
    const storedStatus = localStorage.getItem("paymentStatus");
    return storedStatus || "PENDING"; // Default to PENDING if not set
  });

  // Fetch completed bookings for dashboard data
  useEffect(() => {
    const fetchCompletedBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/booking/get/booking/driver/completed",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const completedBookings = response.data.data;
        const completedTours = completedBookings.length;
        const totalEarnings = completedBookings.reduce(
          (sum, booking) => sum + booking.totalPrice,
          0
        );
        setDashboardData({ completedTours, totalEarnings });
        localStorage.setItem(
          "dashboardData",
          JSON.stringify({ completedTours, totalEarnings })
        );
        setLoadingDashboard(false);
      } catch (err) {
        setError(err.message);
        setLoadingDashboard(false);
      }
    };

    fetchCompletedBookings();
  }, []);

  // Fetch ongoing booking
  useEffect(() => {
    const fetchOngoingBooking = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/booking/get/booking/driver/ongoing",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const booking = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;
        if (booking) {
          setOngoingBooking(booking);
          setPaymentStatus(booking.payment.paymentStatus);
          localStorage.setItem("ongoingBooking", JSON.stringify(booking));
          localStorage.setItem(
            "paymentStatus",
            booking.payment.paymentStatus
          );
        } else {
          setOngoingBooking(null);
          localStorage.removeItem("ongoingBooking");
          localStorage.removeItem("paymentStatus");
        }
        setLoadingOngoing(false);
      } catch (err) {
        setError(err.message);
        setLoadingOngoing(false);
      }
    };

    fetchOngoingBooking();
  }, []);

  // Function to format date and time from ISO string
  const formatDateTime = (dateString) => {
    const dateObj = new Date(dateString);
    const date = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
    const time = dateObj.toTimeString().split(" ")[0]; // HH:MM:SS
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
      case "ONGOING":
        return <PendingIcon sx={{ color: "#0288d1" }} />;
      case "COMPLETED":
        return <CheckCircleIcon sx={{ color: "#388e3c" }} />;
      default:
        return null;
    }
  };

  // Function to get payment status icon
  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <PendingIcon sx={{ color: "#ff9800" }} />;
      case "PAID":
        return <CheckCircleIcon sx={{ color: "#388e3c" }} />;
      default:
        return null;
    }
  };

  // Handle complete trip button click
  const handleCompleteTrip = async (booking) => {
    if (booking.payment.paymentStatus !== "PAID") {
      alert("Payment not completed");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/v1/booking/update/${booking.id}/driver?bookingStatus=COMPLETED`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local state and dashboard data
      const updatedBooking = { ...booking, bookingStatus: "COMPLETED" };
      setOngoingBooking(updatedBooking);
      setDashboardData((prev) => {
        const newData = {
          completedTours: prev.completedTours + 1,
          totalEarnings: prev.totalEarnings + booking.totalPrice,
        };
        localStorage.setItem("dashboardData", JSON.stringify(newData));
        return newData;
      });
      setPaymentStatus(booking.payment.paymentStatus);
      localStorage.setItem(
        "paymentStatus",
        booking.payment.paymentStatus
      );
      localStorage.setItem("ongoingBooking", JSON.stringify(updatedBooking));
      setShowOngoingTrip(false); // Hide ongoing trip section

      console.log(`Booking ID ${booking.id} updated to COMPLETED`);
    } catch (err) {
      console.error(`Failed to update booking ID ${booking.id}:`, err.message);
      setError(`Failed to update booking: ${err.message}`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageTitle title="Driver Home" />

      {/* Dashboard Boxes */}
      {loadingDashboard ? (
        <Typography>Loading dashboard...</Typography>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                backgroundColor: "#4caf50",
                color: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Completed Tours
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {dashboardData.completedTours}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Earnings
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  Rs. {dashboardData.totalEarnings.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Ongoing Trip Section */}
      <Box sx={{ mt: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h5" gutterBottom>
            Ongoing Trip
          </Typography>
          {!showOngoingTrip && paymentStatus === "PAID" && (
            <Typography variant="body1" ml={2}>
              (Completed Trips: {dashboardData.completedTours}, Total Earnings: Rs.{" "}
              {dashboardData.totalEarnings.toFixed(2)})
            </Typography>
          )}
        </Box>
        {loadingOngoing ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : !ongoingBooking ? (
          <Typography>No ongoing trip at the moment.</Typography>
        ) : showOngoingTrip ? (
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                {getStatusIcon(ongoingBooking.bookingStatus)}
                <Typography variant="h6" ml={1}>
                  {ongoingBooking.bookingStatus}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <EventIcon sx={{ mr: 1, color: "#1976d2" }} />
                <Typography variant="body1">
                  {formatDateTime(ongoingBooking.date).date}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <AccessTimeIcon sx={{ mr: 1, color: "#1976d2" }} />
                <Typography variant="body1">
                  {formatDateTime(ongoingBooking.date).time}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <PersonIcon sx={{ mr: 1, color: "#7b1fa2" }} />
                <Typography variant="body1">
                  <strong>Customer:</strong>{" "}
                  {`${ongoingBooking.passenger.firstName} ${ongoingBooking.passenger.lastName}`}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon sx={{ mr: 1, color: "#d32f2f" }} />
                <Typography variant="body1">
                  <strong>Pickup:</strong> {ongoingBooking.pickupLocation}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon sx={{ mr: 1, color: "#d32f2f" }} />
                <Typography variant="body1">
                  <strong>Destination:</strong> {ongoingBooking.destinationLocation}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <MapIcon sx={{ mr: 1, color: "#0288d1" }} />
                <Typography variant="body1">
                  <strong>Distance:</strong> {ongoingBooking.totalDistanceKM} KM
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <PaidIcon sx={{ mr: 1, color: "#388e3c" }} />
                <Typography variant="body1">
                  <strong>Price/KM:</strong> Rs. {ongoingBooking.pricePerKM}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <PaidIcon sx={{ mr: 1, color: "#388e3c" }} />
                <Typography variant="body1">
                  <strong>Total Price:</strong> Rs. {ongoingBooking.totalPrice.toFixed(2)}
                </Typography>
                <Box display="flex" alignItems="center" ml={2}>
                  {getPaymentStatusIcon(paymentStatus)}
                  <Typography variant="body1" ml={1}>
                    {paymentStatus}
                  </Typography>
                </Box>
              </Box>
              {ongoingBooking.bookingStatus !== "COMPLETED" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCompleteTrip(ongoingBooking)}
                  fullWidth
                >
                  Completed
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Typography>Trip completed.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;