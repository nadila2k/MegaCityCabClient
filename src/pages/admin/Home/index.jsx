import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
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
import axios from "axios";
import dayjs from "dayjs"; // For date formatting

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEarnings: 0,
    totalBookings: 0,
    totalOngoing: 0,
    totalCompletedTours: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all bookings and calculate dashboard data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/booking/get/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const bookingsData = response.data.data;

        // Calculate dashboard metrics
        const totalBookings = bookingsData.length;
        const totalOngoing = bookingsData.filter(
          (booking) => booking.bookingStatus === "ONGOING"
        ).length;
        const totalCompletedTours = bookingsData.filter(
          (booking) => booking.bookingStatus === "COMPLETED"
        ).length;
        const totalEarnings = bookingsData.reduce(
          (sum, booking) => sum + booking.totalPrice,
          0
        );

        setDashboardData({
          totalEarnings,
          totalBookings,
          totalOngoing,
          totalCompletedTours,
        });
        setBookings(bookingsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    return dayjs(dateString).format("YYYY-MM-DD");
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

  return (
    <Box sx={{ p: 3 }}>
      <PageTitle title="Admin Dashboard" />

      {/* Loading and Error States */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <>
          {/* Dashboard Boxes */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
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

            <Grid item xs={12} sm={6} md={3}>
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
                    Total Bookings
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {dashboardData.totalBookings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  backgroundColor: "#ff9800",
                  color: "white",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Ongoing
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {dashboardData.totalOngoing}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  backgroundColor: "#9c27b0",
                  color: "white",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Completed Tours
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {dashboardData.totalCompletedTours}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Bookings Table */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              All Bookings
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
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
                  {bookings.map((booking, index) => (
                    <TableRow key={booking.id}>
                      <TableCell>{++index}</TableCell>
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
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;