import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import styles from "./Welcome.module.css";
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Welcome = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        {/* Header with Sign-In and Sign-Up */}
        <header className={styles.header}>
          <Typography variant="h4" className={styles.logo}>
            <LocalTaxiIcon fontSize="large" /> MegaCityCab
          </Typography>
          <Box>
            <Button
              component={Link}
              to="/sign-in"
              variant="outlined"
              color="primary"
              className={styles.authButton}
              sx={{ mr: 2 }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/sign-up?role=PASSENGER"
              variant="contained"
              color="primary"
              className={styles.authButton}
            >
              Sign Up
            </Button>
          </Box>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <Typography variant="h2" className={styles.heroTitle}>
            Ride with Comfort & Safety
          </Typography>
          <Typography variant="h4" className={styles.heroSubtitle} mt={2}>
            Book a ride instantly and enjoy a seamless experience wherever you
            go.
          </Typography>
          <Typography
            variant="h6"
            className={styles.heroSubtitle}
            mt={3}
            mb={4}
          >
            Whether it’s a quick trip across town or a long journey, TaxiRide
            ensures you travel with ease, reliability, and peace of mind.
          </Typography>
          <Button
            component={Link}
            to="/booking" // Assuming a booking route exists
            variant="contained"
            color="secondary"
            className={styles.ctaButton}
            mt={3}
          >
            Get Started
          </Button>
        </section>

        {/* Features Section */}
        <Grid container spacing={3} className={styles.features} mt={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <SpeedIcon fontSize="large" color="primary" />
                <Typography variant="h5" mt={1}>
                  Fast Booking
                </Typography>
                <Typography variant="body2">
                  Book your ride in seconds with our intuitive app. Choose your
                  destination, select a vehicle, and you’re on your way!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <SecurityIcon fontSize="large" color="primary" />
                <Typography variant="h5" mt={1}>
                  Safe & Secure
                </Typography>
                <Typography variant="body2">
                  All rides are insured, and our drivers undergo rigorous
                  background checks for your safety and comfort.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <MonetizationOnIcon fontSize="large" color="primary" />
                <Typography variant="h5" mt={1}>
                  Affordable Pricing
                </Typography>
                <Typography variant="body2">
                  Enjoy competitive rates with transparent pricing—no hidden
                  fees, just great value for every ride.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Content: Benefits Section */}
        <section className={styles.benefits}>
          <Typography variant="h3" className={styles.sectionTitle}>
            Why Choose TaxiRide?
          </Typography>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                24/7 Availability
              </Typography>
              <Typography variant="body1">
                Need a ride at midnight or early morning? We’re here for you
                around the clock with reliable service.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Real-Time Tracking
              </Typography>
              <Typography variant="body1">
                Track your driver’s location in real-time and stay informed
                about your ride’s progress.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Eco-Friendly Options
              </Typography>
              <Typography variant="body1">
                Choose from our range of hybrid and electric vehicles to reduce
                your carbon footprint.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Customer Support
              </Typography>
              <Typography variant="body1">
                Our dedicated support team is ready to assist you with any
                questions or issues, anytime.
              </Typography>
            </Grid>
          </Grid>
        </section>

        {/* Call to Action */}
        <section className={styles.cta}>
          <Typography variant="h4" gutterBottom>
            Ready to Ride?
          </Typography>
          <Typography variant="body1" className={styles.ctaText}>
            Join thousands of happy passengers who trust TaxiRide for their
            daily travel needs.
          </Typography>
          <Button
            component={Link}
            to="/sign-up?role=PASSENGER"
            variant="contained"
            color="primary"
            className={styles.ctaButton}
          >
            Sign Up Now
          </Button>
        </section>
      </Container>
    </div>
  );
};

export default Welcome;
