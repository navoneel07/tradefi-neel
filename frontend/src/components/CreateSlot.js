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

const CreateSlot = (props) => {
  const [open, setOpen] = useState(false);

  const [slotNumber, setSlotNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tradelane, setTradeLane] = useState("");
  const [date, setDate] = useState(null);

  const { fetchData } = props;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = () => {
    const data = {
      slotNumber: slotNumber,
      origin: origin,
      destination: destination,
      tradelane: tradelane,
      date: date,
    };
    axios
      .post("http://localhost:5000/slots/create-slot", data)
      .then((res) => fetchData())
      .catch((err) => console.log("Error: " + err));

    setOpen(false);
  };

  return (
    <>
      {/* <Button fullWidth variant="contained" onClick={handleOpen}>
        Add Slot
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
            Add Slot
          </Typography>
          <TextField
            fullWidth
            label="Slot Number"
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value)}
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
            label="Trade Lane"
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            value={tradelane}
            onChange={(e) => setTradeLane(e.target.value)}
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

export default CreateSlot;
