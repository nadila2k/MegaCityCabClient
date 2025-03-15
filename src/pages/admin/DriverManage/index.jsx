import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ModalUi from "../../../components/ModalUi";
import PageTitle from "../../../components/PageTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNotification } from "../../../context/NotificationContext";

const DriverManage = () => {
  const { showNotification } = useNotification();

  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isUpdateSubmit, setIsUpdateSubmit] = useState(false);

  const vehicleTypes = useSelector(
    (state) => state.vehicleType.vehicleTypes || []
  );

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/driver/all/drivers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDrivers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleEditOpen = (driver) => {
    setSelectedDriver({
      ...driver,
      vehicleTypeId: driver.vehicleType.id,
      image: null,
    });
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedDriver(null);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsUpdateSubmit(true);
    if (!selectedDriver) return;
  
    try {
      const updatePayload = {
        firstName: selectedDriver.firstName,
        lastName: selectedDriver.lastName,
        address: selectedDriver.address,
        mobileNumber: selectedDriver.mobileNumber,
        licenseNumber: selectedDriver.licenseNumber,
        vehicaleName: selectedDriver.vehicaleName,
        vehicalNumber: selectedDriver.vehicalNumber,
        vehicleTypeId: selectedDriver.vehicleTypeId,
      };
  
      // Always use FormData to ensure consistent request format
      const formData = new FormData();
      Object.entries(updatePayload).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      // Only append image if it exists (optional)
      if (selectedDriver.image) {
        formData.append("image", selectedDriver.image);
      }
  
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/update/${selectedDriver.id}/driver`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setDrivers((prevDrivers) =>
        prevDrivers.map((d) =>
          d.id === selectedDriver.id ? response.data.data : d
        )
      );
      showNotification("Updated successfully", "success");
      handleClose();
    } catch (err) {
      showNotification("Update error", "error");
      setError(err.message);
    } finally {
      setIsUpdateSubmit(false);
    }
  };

  const handleDelete = async (driverId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/admin/delete/${driverId}/driver`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDrivers((prevDrivers) => prevDrivers.filter((d) => d.id !== driverId));
      showNotification("Deleted successfully", "success");
    } catch (err) {
      showNotification("Deleted error", "error");
      setError(err.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedDriver((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setSelectedDriver((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));
  };

  const handleVehicleTypeChange = (vehicleTypeId) => {
    setSelectedDriver((prev) => ({
      ...prev,
      vehicleTypeId,
    }));
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <PageTitle title="Manage Drivers" />
      </Box>

      {loading && <Typography>Loading drivers...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>License</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Vehicle Number</TableCell>
                <TableCell>Vehicle Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.id}</TableCell>
                  <TableCell>{`${driver.firstName} ${driver.lastName}`}</TableCell>
                  <TableCell>{driver.address}</TableCell>
                  <TableCell>{driver.mobileNumber}</TableCell>
                  <TableCell>{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.vehicaleName}</TableCell>
                  <TableCell>{driver.vehicalNumber}</TableCell>
                  <TableCell>{driver.vehicleType.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditOpen(driver)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(driver.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedDriver && (
        <ModalUi
          open={openModal}
          onClose={handleClose}
          onSubmit={handleUpdate}
          title="Edit Driver"
          isLoading={isUpdateSubmit}
        >
          <Box mt={2}>
            <TextField
              margin="dense"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={selectedDriver.firstName}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              value={selectedDriver.lastName}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              value={selectedDriver.address}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="mobileNumber"
              label="Mobile Number"
              type="text"
              fullWidth
              value={selectedDriver.mobileNumber}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="licenseNumber"
              label="License Number"
              type="number"
              fullWidth
              value={selectedDriver.licenseNumber}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="vehicaleName"
              label="Vehicle Name"
              type="text"
              fullWidth
              value={selectedDriver.vehicaleName}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="vehicalNumber"
              label="Vehicle Number"
              type="text"
              fullWidth
              value={selectedDriver.vehicalNumber}
              onChange={handleInputChange}
              required
            />

            <Typography variant="subtitle1" mt={2}>
              Select Vehicle Type:
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
              {vehicleTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={
                    selectedDriver.vehicleTypeId === type.id
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

            <Box mt={2}>
              <Typography variant="subtitle1">
                Update Driver Image (Optional):
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: "8px" }}
              />
              {selectedDriver.imageUrl && !selectedDriver.image && (
                <Box mt={1}>
                  <Typography variant="body2">Current Image:</Typography>
                  <img
                    src={selectedDriver.imageUrl}
                    alt="Current driver"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </ModalUi>
      )}
    </>
  );
};

export default DriverManage;
