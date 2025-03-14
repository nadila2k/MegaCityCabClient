import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import PageTitle from "../../../components/PageTitle"; // Assuming you have this component

const Home = () => {
  // Static counter values (replace with dynamic data from Redux/API later)
  const dashboardData = {
    active: 5,
    completed: 12,
    ongoing: 3,
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <PageTitle title="Passenger Home" />

      {/* Dashboard Boxes */}
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
    </Box>
  );
};

export default Home;