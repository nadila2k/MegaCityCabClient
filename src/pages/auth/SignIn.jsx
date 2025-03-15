import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/app.constants";
import { useDispatch } from "react-redux";
import { signInThunk } from "../../store/thunks/authThunks";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(signInThunk(user)).unwrap();
      if (response.status === "SUCCESS") {
        console.log("handleSubmit ", response.data);
        navigate(`/${response.data.userData.roles}`);
      }
    } catch (error) {
      console.log("Error ", error);
    } finally {
      setLoading(true);
    }
  };

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
        <Typography variant="h5" gutterBottom>
          SignIn
        </Typography>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          name="email"
          onChange={handleInput}
          value={user.email}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          name="password"
          onChange={handleInput}
          value={user.password}
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          loading={loading}
        >
          Sign In
        </Button>
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 2, textAlign: "left" }}
        >
          Create new account ?{" "}
          <Link to={`/sign-up?role=${ROLES.PASSENGER}`}>Passenger</Link> |{" "}
          <Link to={`/sign-up?role=${ROLES.DRIVER}`}>Driver</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
