import React, { useState } from "react";
import {
  Card,
  Typography,
  CardContent,
  CardHeader,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import axios from "axios";

const Slot = (props) => {
  const {
    slotNum,
    origin,
    destination,
    date,
    tradelane,
    shipment,
    fetchData,
    setShipment,
    toMail,
    isAvailable,
  } = props;

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = () => setOpen(false);

  const alert = (s, m) => {
    setSeverity(s);
    setMessage(m);
    setOpen(true);
  };

  const handleBook = () => {
    if (!shipment) {
      return alert("error", "No shipment selected.");
    }
    if (shipment.isAllotted) {
      return alert("error", "Shipment is already allotted to a slot!");
    }
    axios
      .post("http://localhost:5000/slots/book-slot", {
        slotNumber: slotNum,
        shipment: shipment.shipmentNumber,
        toMail: toMail,
      })
      .then((res) => {
        fetchData();
        setShipment(null);
      })
      .catch((err) => alert("error", err));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <CardHeader title={"Slot Number: " + slotNum} />
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Origin : {origin}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Destination : {destination}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Tradelane : {tradelane}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Date Available : {date}
          </Typography>
          {isAvailable ? <Button onClick={handleBook}>Book</Button> : <></>}
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              severity={severity}
              sx={{ width: "100%" }}
              onClose={handleClose}
            >
              {message}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Slot;
