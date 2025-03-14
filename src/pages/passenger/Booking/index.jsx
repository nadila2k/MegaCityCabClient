import { Box, Button, TextField } from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import { useState } from "react";
import ModalUi from "../../../components/ModalUi";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Booking = () => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    date: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log("Submitted email:", email);
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormState((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  return (
    <>
      <PageTitle title="Booking" />
      <Button variant="contained" onClick={handleClickOpen}>
        Create new Booking
      </Button>

      <ModalUi
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title="New Booking"
      >
        <Box mt={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={formState.date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} margin="dense" fullWidth />
              )}
            />
          </LocalizationProvider>
        </Box>
      </ModalUi>
    </>
  );
};

export default Booking;
