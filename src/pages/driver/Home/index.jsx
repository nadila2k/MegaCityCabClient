import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import PageTitle from "../../../components/PageTitle"; // Assuming you have this component

const Home = () => {
  const dashboardData = {
    completedTours: 12,
    totalEarnings: 450.75, 
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageTitle title="Driver Home" />
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
    </Box>
  );
};

export default Home;