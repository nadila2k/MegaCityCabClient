import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState, useEffect } from "react"; // Add useEffect
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ROLES } from "../../constants/app.constants";
import { signUpThunk } from "../../store/thunks/authThunks";
import { useDispatch } from "react-redux";
import axios from "axios"; // Import axios for API calls

const SignUp = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [passenger, setPassenger] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
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
    vehicleName: "",
    vehicalNumber: "",
    vehicleTypeId: "", 
    image: null,
    roles: ROLES.DRIVER,
  });

  const [vehicleTypes, setVehicleTypes] = useState([]); // State for vehicle types from API
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const role = searchParams.get("role");
  const roleUrl = role.toLowerCase();

  // Fetch vehicle types from API when component mounts
  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/vehicle/all/vehicles/public");
        setVehicleTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
      }
    };

    fetchVehicleTypes();
  }, []);

  const handlePassengerInput = (e) => {
    const { name, value } = e.target;
    setPassenger({ ...passenger, [name]: value });
  };

  const handlePasswordCheck = (passwordConfrim) => {
    setIsPasswordMatch(passenger.password === passwordConfrim);
  };

  const handleDriverPasswordCheck = (passwordConfrim) => {
    setIsPasswordMatch(driver.password === passwordConfrim);
  };

  const handleDriverInput = (e) => {
    const { name, value } = e.target;
    setDriver({ ...driver, [name]: value });
  };

  const handlePassengerSubmit = async (e) => {
    e.preventDefault();
    const { passwordConfrim, ...rest } = passenger;
    try {
      const response = await dispatch(signUpThunk(rest)).unwrap();
      if (response.status === "SUCCESS") {
        setPassenger({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          address: "",
          password: "",
          roles: ROLES.PASSENGER,
        })
        navigate(`/${roleUrl}`);
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in driver) {
      if (key !== "passwordConfrim") {
        formData.append(key, driver[key]);
      }
    }
    try {
      const response = await dispatch(signUpThunk(formData)).unwrap();
      if (response.status === "SUCCESS") {
        setDriver({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          address: "",
          password: "",
          licenseNumber: "",
          vehicleName: "",
          vehicleNumber: "",
          vehicleTypeId: "", 
          image: null,
          roles: ROLES.DRIVER,
        })
        navigate(`/${roleUrl}`);
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };

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
          name="mobileNumber"
          onChange={handlePassengerInput}
          value={passenger.mobileNumber}
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
          label="Password Confirm"
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
          label="Vehicle Name"
          margin="normal"
          variant="outlined"
          name="vehicleName"
          onChange={handleDriverInput}
        />
        <TextField
          fullWidth
          label="Vehicle Number"
          margin="normal"
          variant="outlined"
          name="vehicleNumber"
          onChange={handleDriverInput}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select vehicle type"
          margin="normal"
          fullWidth
          sx={{ textAlign: "left" }}
          name="vehicleTypeId"
          onChange={handleDriverInput}
          value={driver.vehicleTypeId || ""} 
        >
          {vehicleTypes.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
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
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Selected Image:
            </Typography>
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
          Already have an account? <Link to={`/sign-in`}>SignIn</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignUp;
