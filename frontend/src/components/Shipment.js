import React from "react";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
import {
  Card,
  Typography,
  CardContent,
  CardHeader,
  Box,
  Button,
} from "@mui/material";
const Shipment = (props) => {
  const { shipmentNumber, origin, destination, date, weight } = props.shipment;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <CardHeader title={"Shipment Number: " + shipmentNumber} />
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Origin : {origin}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Destination : {destination}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            weight : {weight}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Date ofShipping : {date}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Shipment;
