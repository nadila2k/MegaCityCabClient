import { Box, Button, TextField, Typography } from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import { useState, useEffect } from "react";
import ModalUi from "../../../components/ModalUi";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { REDUX_STATUS } from "./../../../constants/app.constants";
import {
  vehicleTypeCreateThunk,
  vehicleTypeListThunk,
} from "../../../store/thunks/vehicleTypeThunks";

const VehicleType = () => {
  const dispatch = useDispatch();
  const { vehicleTypes, status, error } = useSelector(
    (state) => state.vehicleType
  );

  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    if (status === REDUX_STATUS.IDLE) {
      dispatch(vehicleTypeListThunk());
    }
  }, [dispatch, status]);

  const handleClickOpen = () => {
    setFormState({
      name: "",
      price: "",
      image: null,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        vehicleTypeCreateThunk({
          name: formState.name,
          price: parseFloat(formState.price),
          image: formState.image,
        })
      ).unwrap();
      handleClose();
    } catch (error) {
      console.error("Error creating vehicle:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      image: event.target.files[0],
    }));
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title="Vehicle Type" />
        <Button variant="contained" onClick={handleClickOpen}>
          Create New Vehicle Type
        </Button>
      </Box>

      {/* Loading and Error States */}
      {status === REDUX_STATUS.PENDING && <Typography>Loading...</Typography>}
      {status === REDUX_STATUS.FAILED && (
        <Typography color="error">Error: {error}</Typography>
      )}

      {/* Vehicle Types Table */}
      {status === REDUX_STATUS.SUCCEEDED && vehicleTypes && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Price (per KM)
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Image
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicleTypes.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.id}</TableCell>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.price}</TableCell>
                  <TableCell>
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      style={{ width: 50, height: 50, objectFit: "contain" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create Vehicle Modal */}
      <ModalUi
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title="Create Vehicle Type"
      >
        <Box mt={2}>
          <TextField
            margin="dense"
            name="name"
            label="Vehicle Name"
            type="text"
            fullWidth
            value={formState.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price per KM"
            type="number"
            fullWidth
            value={formState.price}
            onChange={handleChange}
          />
          <Typography variant="subtitle1" mt={2}>
            Upload Vehicle Image:
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: 8 }}
          />
        </Box>
      </ModalUi>
    </>
  );
};

export default VehicleType;
