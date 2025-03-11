import { Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ROLES } from "../../constants/app.constants";

const vehicleTypes = [
  {
    id: 1,
    value: "Sedan",
  },
  {
    id: 2,
    value: "Tuk",
  },
  {
    id: 3,
    value: "Van",
  },
  {
    id: 4,
    value: "SUV",
  },
  {
    id: 5,
    value: "Minibus",
  },
  {
    id: 6,
    value: "Scooter",
  },
  {
    id: 7,
    value: "Jeep",
  },
];

const SignUp = () => {
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role");

  let form = "";

  if (role === ROLES.PASSENGER) {
    form = (
      <>
        <Typography variant="h5" gutterBottom>
          SignUp as Passenger
        </Typography>
        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          variant="outlined"
        />
        <TextField fullWidth label="Email" margin="normal" variant="outlined" />
        <TextField
          fullWidth
          label="Number"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Address"
          margin="normal"
          variant="outlined"
          multiline
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password Confrim"
          type="password"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </>
    );
  } else {
    form = (
      <>
        <Typography variant="h5" gutterBottom>
          SignUp as Driver
        </Typography>
        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          variant="outlined"
        />
        <TextField fullWidth label="Email" margin="normal" variant="outlined" />
        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Address"
          margin="normal"
          variant="outlined"
          multiline
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password Confrim"
          type="password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="License Number"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Vehicale Name"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Vehical Number"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select vehicle type"
          defaultValue="Sedan"
          margin="normal"
          fullWidth
          sx={{ textAlign: "left" }}
        >
          {vehicleTypes.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </>
    );
  }

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
          borderRadius: "9px",
        }}
      >
        {form}
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 2, textAlign: "left" }}
        >
          Do have an account ? <Link to={`/sign-in`}>SignIn</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignUp;
