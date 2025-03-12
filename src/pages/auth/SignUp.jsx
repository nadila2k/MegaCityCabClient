import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ROLES } from "../../constants/app.constants";
import { signUpThunk } from "../../store/thunks/authThunks";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [passenger, setPassenger] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    address: "",
    password: "",
    roles: ROLES.PASSENGER,
  });

  const [driver, setDriver] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    password: "",
    licenseNumber: "",
    vehicaleName: "",
    vehicalNumber: "",
    vehicleType: "",
    image: null,
    roles: ROLES.DRIVER,
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const role = searchParams.get("role");
  let form = "";

  const handlePassengerInput = (e) => {
    const { name, value } = e.target;
    setPassenger({ ...passenger, [name]: value });
  };

  const handlePasswordCheck = (passwordConfrim) => {
    if (passenger.password === passwordConfrim) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const handleDriverPasswordCheck = (passwordConfrim) => {
    if (driver.password === passwordConfrim) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const handleDriverInput = (e) => {
    const { name, value } = e.target;
    setDriver({ ...driver, [name]: value });
  };

  const handlePassengerSubmit = (e) => {
    e.preventDefault();
    const { passwordConfrim, ...rest } = passenger;
    try {
      dispatch(signUpThunk(rest));
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const handleDriverSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in driver) {
      if (key !== "passwordConfrim") {
        formData.append(key, driver[key]);
      }
    }
    try {
      dispatch(signUpThunk(formData)); 
    } catch (error) {
      console.log("Error ", error);
    }
  };

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
          name="firstName"
          onChange={handlePassengerInput}
          value={passenger.firstName}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          variant="outlined"
          name="lastName"
          onChange={handlePassengerInput}
          value={passenger.lastName}
          required
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          name="email"
          onChange={handlePassengerInput}
          value={passenger.email}
          required
        />
        <TextField
          fullWidth
          label="Number"
          margin="normal"
          variant="outlined"
          name="number"
          onChange={handlePassengerInput}
          value={passenger.number}
          required
        />
        <TextField
          fullWidth
          label="Address"
          margin="normal"
          variant="outlined"
          multiline
          name="address"
          onChange={handlePassengerInput}
          value={passenger.address}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          name="password"
          onChange={handlePassengerInput}
          value={passenger.password}
          required
        />
        <TextField
          fullWidth
          label="Password Confrim"
          type="password"
          margin="normal"
          variant="outlined"
          name="passwordConfrim"
          onChange={(e) => handlePasswordCheck(e.target.value)}
          required
        />
        {!isPasswordMatch && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "left",
              color: "red",
              fontWeight: "bold",
            }}
          >
            Password not matched.
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePassengerSubmit}
          disabled={!isPasswordMatch}
        >
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
          name="firstName"
          onChange={handleDriverInput}
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          variant="outlined"
          name="lastName"
          onChange={handleDriverInput}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          name="email"
          onChange={handleDriverInput}
        />
        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
          variant="outlined"
          name="mobileNumber"
          onChange={handleDriverInput}
        />
        <TextField
          fullWidth
          label="Address"
          margin="normal"
          variant="outlined"
          multiline
          name="address"
          onChange={handleDriverInput}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          name="password"
          onChange={handleDriverInput}
        />
        <TextField
          fullWidth
          label="Password Confrim"
          type="password"
          margin="normal"
          variant="outlined"
          name="passwordConfrim"
          onChange={(e) => handleDriverPasswordCheck(e.target.value)}
        />
        {!isPasswordMatch && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "left",
              color: "red",
              fontWeight: "bold",
            }}
          >
            Password not matched.
          </Typography>
        )}
        <TextField
          fullWidth
          label="License Number"
          margin="normal"
          variant="outlined"
          name="licenseNumber"
          onChange={handleDriverInput}
        />
        <TextField
          fullWidth
          label="Vehicale Name"
          margin="normal"
          variant="outlined"
          name="vehicaleName"
          onChange={handleDriverInput}
        />
        <TextField
          fullWidth
          label="Vehical Number"
          margin="normal"
          variant="outlined"
          name="vehicalNumber"
          onChange={handleDriverInput}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select vehicle type"
          defaultValue="Sedan"
          margin="normal"
          fullWidth
          sx={{ textAlign: "left" }}
          name="vehicleType"
          onChange={handleDriverInput}
          value={driver.vehicleType}
        >
          {vehicleTypes.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Profile Image"
          margin="normal"
          variant="outlined"
          type="file"
          name="image"
          onChange={(e) => {
            const file = e.target.files[0];
            setDriver({ ...driver, image: file });
          }}
        />
         {driver.image && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{fontWeight: "bold"}}>Selected Image:</Typography>
            <img
              src={URL.createObjectURL(driver.image)}
              alt="Profile Preview"
              style={{ maxWidth: "100px", height: "auto", marginTop: "10px" }}
            />
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleDriverSubmit}
          disabled={!isPasswordMatch}
        >
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
