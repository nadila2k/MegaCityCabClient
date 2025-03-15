import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import axios from "axios";

const Profile = () => {
  const [passengerData, setPassengerData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/passenger/me/passenger",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPassengerData({
          firstName: response.data.data.firstName || "",
          lastName: response.data.data.lastName || "",
          address: response.data.data.address || "",
          mobileNumber: response.data.data.mobileNumber || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPassengerData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassengerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatePayload = {
        firstName: passengerData.firstName,
        lastName: passengerData.lastName,
        address: passengerData.address,
        mobileNumber: passengerData.mobileNumber,
      };

      const response = await axios.put(
        "http://localhost:8080/api/v1/passenger/update/passenger",
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPassengerData({
        firstName: response.data.data.firstName || "",
        lastName: response.data.data.lastName || "",
        address: response.data.data.address || "",
        mobileNumber: response.data.data.mobileNumber || "",
      });
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="start" mb={3}>
        <PageTitle title="My Profile" />
        {!editMode && (
          <Button variant="contained" onClick={toggleEditMode}>
            Edit Profile
          </Button>
        )}
      </Box>

      {loading && <Typography>Loading profile...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      {!loading && !error && (
        <Paper sx={{ p: 3, maxWidth: 800,  }}>
          <form onSubmit={handleUpdate}>
            <TextField
              margin="dense"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={passengerData.firstName}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              value={passengerData.lastName}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              value={passengerData.address}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
            <TextField
              margin="dense"
              name="mobileNumber"
              label="Mobile Number"
              type="text"
              fullWidth
              value={passengerData.mobileNumber}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />

            {editMode && (
              <Box mt={2} display="flex" gap={2}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={toggleEditMode}
                  color="secondary"
                >
                  Cancel
                </Button>
              </Box>
            )}
          </form>
        </Paper>
      )}
    </>
  );
};

export default Profile;