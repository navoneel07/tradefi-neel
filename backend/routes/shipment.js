const router = require("express").Router();
let Shipment = require("../models/shipments.model");

router.route("/").get((req, res) => {
  res.json("Shipment Api Called");
});

router.route("/create-shipment").post((req, res) => {
  const shipmentNumber = req.body.shipmentNumber;
  const origin = req.body.origin;
  const destination = req.body.destination;
  const date = req.body.date;
  const weight = req.body.weight;

  const newShipment = new Shipment({
    shipmentNumber,
    origin,
    destination,
    date,
    weight,
  });

  newShipment
    .save()
    .then(() => res.json("Shipment added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get-shipments").get((req, res) => {
  Shipment.find({})
    .then((shipments) => res.json(shipments))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
