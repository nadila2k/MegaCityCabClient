import {
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Link } from "react-router-dom";
import { ROLES } from "../../constants/app.constants";

const SignIn = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ px: 2 }}
      minHeight="100vh"
    >
      <Paper
        sx={{
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          padding: "32px",
          boxShadow: "1px 1px 5px ",
          borderRadius: "9px"
        }}
      >
        <Typography variant="h5" gutterBottom>
          SignIn
        </Typography>
        <TextField fullWidth label="Email" margin="normal" variant="outlined" />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Sign In
        </Button>
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 2, textAlign: "left" }}
        >
          Already have an account ?{" "}
          <Link to={`/sign-up?role=${ROLES.PASSENGER}`}>Passenger</Link> |{" "}
          <Link to={`/sign-up?role=${ROLES.ADMIN}`}>Driver</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
