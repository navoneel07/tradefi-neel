import React, { useState, useEffect } from "react";
import { Grid, Typography, MenuItem, TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import Slot from "./Slot";
import Shipment from "./Shipment";
import CreateSlot from "./CreateSlot";
import CreateShipment from "./CreateShipment";

import { parse, isEqual, set } from "date-fns";
import axios from "axios";

import { useLocation } from "react-router-dom";

const Book = (props) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tradelane, setTradeLane] = useState("");
  const [date, setDate] = useState(null);
  const [shipment, setShipment] = useState(null);
  const [data, setData] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);

  const location = useLocation();

  console.log(location.state);

  const fetchData = () => {
    console.log("getting data");
    const dataUri = "http://localhost:5000/slots/get-slots";
    const shipmentDataUri = "http://localhost:5000/shipments/get-shipments";

    const dataReq = axios.get(dataUri);
    const shipmentDataReq = axios.get(shipmentDataUri);

    axios
      .all([dataReq, shipmentDataReq])
      .then(
        axios.spread((...responses) => {
          const data = responses[0].data;
          const shipmentData = responses[1].data.filter(
            (item) => item.isAllotted === false
          );
          setData(data);
          setShipmentData(shipmentData);
        })
      )
      .catch((err) => console.log("getting data error: " + err));
  };

  useEffect(() => fetchData(), []);

  const handleFilter = (data, key, value) => {
    if (key === "date") {
      return data.filter((item) =>
        isEqual(
          parse(item[key], "dd/MM/yy", new Date()),
          set(value, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
        )
      );
    } else {
      return data.filter((item) => item[key] === value);
    }
  };

  let filteredData = data.filter((item) => item.isAvailable === true);

  if (origin) filteredData = handleFilter(filteredData, "origin", origin);
  if (destination)
    filteredData = handleFilter(filteredData, "destination", destination);
  if (tradelane)
    filteredData = handleFilter(filteredData, "tradelane", tradelane);
  if (date) filteredData = handleFilter(filteredData, "date", date);

  return (
    <Grid container direction="row">
      <Grid item xs={7} style={{ maxHeight: "100vh", overflow: "auto" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          padding={3}
          rowSpacing={2}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              //   alignItems="center"
              //   justifyContent="center"
              columnSpacing={1}
            >
              <Grid item sx={{ flexGrow: 1 }} xs={1}>
                <CreateSlot fetchData={fetchData} />
              </Grid>
              <Grid item sx={{ flexGrow: 1 }} xs={3}>
                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  select
                  label="Origin"
                >
                  <MenuItem key={0} value="">
                    Remove
                  </MenuItem>
                  {filteredData.map((o) => (
                    <MenuItem value={o.origin}>{o.origin}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sx={{ flexGrow: 1 }} xs={3}>
                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  select
                  label="Destination"
                >
                  <MenuItem key={0} value="">
                    Remove
                  </MenuItem>
                  {filteredData.map((o) => (
                    <MenuItem value={o.destination}>{o.destination}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sx={{ flexGrow: 1 }} xs={3}>
                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={tradelane}
                  onChange={(e) => setTradeLane(e.target.value)}
                  select
                  label="Trade Lane"
                >
                  <MenuItem key={0} value="">
                    Remove
                  </MenuItem>
                  {filteredData.map((o) => (
                    <MenuItem value={o.tradelane}>{o.tradelane}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sx={{ flexGrow: 1 }} xs={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date Available"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          {filteredData.length ? (
            filteredData.map((o) => {
              return (
                <Grid item>
                  <Slot
                    slotNum={o.slotNumber}
                    origin={o.origin}
                    destination={o.destination}
                    tradelane={o.tradelane}
                    date={o.date}
                    shipment={shipment}
                    fetchData={fetchData}
                    setShipment={setShipment}
                    toMail={location.state.email}
                  />
                </Grid>
              );
            })
          ) : (
            <Typography>No slots found!</Typography>
          )}
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          padding={3}
          rowSpacing={1}
        >
          <Grid item sx={{ flexGrow: 1 }}>
            <Grid
              container
              direction="row"
              //   alignItems="center"
              //   justifyContent="center"
              columnSpacing={2}
            >
              <Grid item sx={{ flexGrow: 1 }} xs={2}>
                <CreateShipment fetchData={fetchData} />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={shipment}
                  onChange={(e) => setShipment(e.target.value)}
                  select
                  label="Select Shipment"
                >
                  {shipmentData.map((o) => (
                    <MenuItem value={o}>{o.shipmentNumber}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {shipment ? (
              <Shipment shipment={shipment} />
            ) : (
              <Typography>No shipment slelected!</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Book;
