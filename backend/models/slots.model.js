const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const slotSchema = new Schema({
  slotNumber: { type: String, unique: true, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  tradelane: { type: String, required: true },
  date: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  shipment: { type: String, default: "" },
});

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
