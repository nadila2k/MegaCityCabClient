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
import { useSelector } from "react-redux";

const Profile = () => {
  const [driverData, setDriverData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: "",
    licenseNumber: "",
    vehicaleName: "",
    vehicalNumber: "",
    imageUrl: "",
    imageId: "",
    vehicleTypeId: null,
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const vehicleTypes = useSelector((state) => state.vehicleType.vehicleTypes || []);

  // Fetch driver data
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/driver/me/driver",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data.data;
        setDriverData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          address: data.address || "",
          mobileNumber: data.mobileNumber || "",
          licenseNumber: data.licenseNumber || "",
          vehicaleName: data.vehicaleName || "",
          vehicalNumber: data.vehicalNumber || "",
          imageUrl: data.imageUrl || "",
          imageId: data.imageId || "",
          vehicleTypeId: data.vehicleType?.id || null,
          image: null,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDriverData();
  }, []);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDriverData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (event) => {
    setDriverData((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));
  };

  // Handle vehicle type selection
  const handleVehicleTypeChange = (vehicleTypeId) => {
    setDriverData((prev) => ({
      ...prev,
      vehicleTypeId,
    }));
  };

  // Handle update submission
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatePayload = {
        firstName: driverData.firstName,
        lastName: driverData.lastName,
        address: driverData.address,
        mobileNumber: driverData.mobileNumber,
        licenseNumber: driverData.licenseNumber,
        vehicaleName: driverData.vehicaleName,
        vehicalNumber: driverData.vehicalNumber,
        imageUrl: driverData.imageUrl,
        imageId: driverData.imageId,
        vehicleTypeId: driverData.vehicleTypeId,
        image: driverData.image || null,
      };

      let response;
      if (driverData.image) {
        const formData = new FormData();
        Object.entries(updatePayload).forEach(([key, value]) => {
          formData.append(key, value);
        });

        response = await axios.put(
          "http://localhost:8080/api/v1/driver/update/driver",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.put(
          "http://localhost:8080/api/v1/driver/update/driver",
          updatePayload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Update local state with response data
      const updatedData = response.data.data;
      setDriverData({
        firstName: updatedData.firstName || "",
        lastName: updatedData.lastName || "",
        address: updatedData.address || "",
        mobileNumber: updatedData.mobileNumber || "",
        licenseNumber: updatedData.licenseNumber || "",
        vehicaleName: updatedData.vehicaleName || "",
        vehicalNumber: updatedData.vehicalNumber || "",
        imageUrl: updatedData.imageUrl || "",
        imageId: updatedData.imageId || "",
        vehicleTypeId: updatedData.vehicleType?.id || null,
        image: null,
      });
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <PageTitle title="My Driver Profile" />
        {!editMode && (
          <Button variant="contained" onClick={toggleEditMode}>
            Edit Profile
          </Button>
        )}
      </Box>

      {loading && <Typography>Loading profile...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      {!loading && !error && (
        <Paper sx={{ p: 3, maxWidth: 800,}}>
          <form onSubmit={handleUpdate}>
            <TextField
              margin="dense"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={driverData.firstName}
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
              value={driverData.lastName}
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
              value={driverData.address}
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
              value={driverData.mobileNumber}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
            <TextField
              margin="dense"
              name="licenseNumber"
              label="License Number"
              type="number"
              fullWidth
              value={driverData.licenseNumber}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
            <TextField
              margin="dense"
              name="vehicaleName"
              label="Vehicle Name"
              type="text"
              fullWidth
              value={driverData.vehicaleName}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
            <TextField
              margin="dense"
              name="vehicalNumber"
              label="Vehicle Number"
              type="text"
              fullWidth
              value={driverData.vehicalNumber}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />

            {/* Vehicle Type Selection */}
            {editMode && (
              <>
                <Typography variant="subtitle1" mt={2}>
                  Select Vehicle Type:
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                  {vehicleTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={
                        driverData.vehicleTypeId === type.id
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleVehicleTypeChange(type.id)}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <img
                        src={type.imageUrl}
                        alt={type.name}
                        style={{ width: 30, height: 30 }}
                      />
                      {type.name} (${type.price}/KM)
                    </Button>
                  ))}
                </Box>
              </>
            )}
            {!editMode && (
              <TextField
                margin="dense"
                label="Vehicle Type"
                value={
                  vehicleTypes.find((type) => type.id === driverData.vehicleTypeId)?.name || ""
                }
                fullWidth
                disabled
              />
            )}

            {/* Image Display and Upload */}
            <Box mt={2}>
              <Typography variant="subtitle1">
                {editMode ? "Update Driver Image (Optional):" : "Driver Image:"}
              </Typography>
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ marginTop: "8px" }}
                />
              )}
              {driverData.imageUrl && (
                <Box mt={1}>
                  <Typography variant="body2">Current Image:</Typography>
                  <img
                    src={driverData.imageUrl}
                    alt="Driver"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </Box>
              )}
            </Box>

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