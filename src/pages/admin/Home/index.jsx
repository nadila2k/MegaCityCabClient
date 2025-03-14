import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import PageTitle from "../../../components/PageTitle"; // Assuming you have this component

const Home = () => {
  const dashboardData = {
    totalEarnings: 1250.5,
    totalBookings: 25,
    totalOngoing: 4,
    totalCompletedTours: 18,
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageTitle title="Admin Dashboard" />

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
    </Box>
  );
};

export default Home;
