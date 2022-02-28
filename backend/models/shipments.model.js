const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
  shipmentNumber: { type: String, unique: true, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  weight: { type: Number, default: 0 },
  isAllotted: { type: Boolean, default: false },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;
