import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import axios from "axios";

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    active: 0,
    completed: 0,
    ongoing: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const bookings = response.data.data;

        // Calculate counts based on bookingStatus
        const active = bookings.filter(
          (booking) => booking.bookingStatus === "ACTIVE" || booking.bookingStatus === "DRIVERCONFIRMED"
        ).length;
        const completed = bookings.filter(
          (booking) => booking.bookingStatus === "COMPLETED"
        ).length;
        const ongoing = bookings.filter(
          (booking) => booking.bookingStatus === "ONGOING"
        ).length;

        setDashboardData({ active, completed, ongoing });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <PageTitle title="Passenger Home" />

      {/* Loading and Error States */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        /* Dashboard Boxes */
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Active Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#1976d2", // Blue
                color: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {dashboardData.active}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Completed Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#4caf50", // Green
                color: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Completed
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {dashboardData.completed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Ongoing Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#ff9800", // Orange
                color: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ongoing
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {dashboardData.ongoing}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Home;