const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const slotRoutes = require("./routes/slots");

app.use("/slots", slotRoutes);

const shipmentRoutes = require("./routes/shipment");

app.use("/shipments", shipmentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
