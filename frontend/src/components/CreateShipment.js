import React, { useState } from "react";
import * as constants from "../constants/countries";
import {
  Modal,
  Typography,
  Button,
  Box,
  TextField,
  Autocomplete,
  Fab,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import axios from "axios";

const CreateShipment = (props) => {
  const [open, setOpen] = useState(false);

  const [shipmentNumber, setShipmentNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState(null);

  const { fetchData } = props;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = () => {
    const data = {
      shipmentNumber: shipmentNumber,
      origin: origin,
      destination: destination,
      weight: weight,
      date: date,
    };
    axios
      .post("http://localhost:5000/shipments/create-shipment", data)
      .then((res) => fetchData())
      .catch((err) => console.log("Error: " + err));
    setOpen(false);
  };

  return (
    <>
      {/* <Button variant="contained" onClick={handleOpen}>
        Add Shipment
      </Button> */}
      <Fab
        sx={{ position: "fixed", top: "90%", zIndex: 2 }}
        color="primary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" marginBottom={1}>
            Add Shipment
          </Typography>
          <TextField
            fullWidth
            label="Shipment Number"
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            value={shipmentNumber}
            onChange={(e) => setShipmentNumber(e.target.value)}
          />
          <Autocomplete
            disablePortal
            options={constants.COUNTRIES}
            renderInput={(params) => <TextField {...params} label="Origin" />}
            fullWidth
            sx={{ marginBottom: "20px" }}
            onChange={(_, v) => setOrigin(v)}
          />
          <Autocomplete
            disablePortal
            options={constants.COUNTRIES}
            renderInput={(params) => (
              <TextField {...params} label="Destination" />
            )}
            fullWidth
            sx={{ marginBottom: "20px" }}
            onChange={(_, v) => setDestination(v)}
          />
          <TextField
            fullWidth
            label="Weight"
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <TextField
            fullWidth
            label="Date Available (dd/mm/yy)"
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button fullWidth variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateShipment;
