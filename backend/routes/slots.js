const router = require("express").Router();
const nodemailer = require("nodemailer");
const Slot = require("../models/slots.model");
const Shipment = require("../models/shipments.model");

const sendMail = (toMail, slotNumber, shipmentNumber) => {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error("Failed to create a testing account. " + err.message);
      return process.exit(1);
    }

    console.log("Credentials obtained, sending message...");

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    // Message object
    let message = {
      from: account.user,
      to: toMail,
      subject: `Slot Booking info for shipment ${shipmentNumber}`,
      text: `Slot ${slotNumber} has been booked for ${shipmentNumber}`,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });
};

router.route("/").get((req, res) => {
  res.json("Api Called");
});

router.route("/create-slot").post((req, res) => {
  const slotNumber = req.body.slotNumber;
  const origin = req.body.origin;
  const destination = req.body.destination;
  const tradelane = req.body.tradelane;
  const date = req.body.date;

  const newSlot = new Slot({
    slotNumber,
    origin,
    destination,
    tradelane,
    date,
  });

  newSlot
    .save()
    .then(() => res.json("Slot added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get-slots").get((req, res) => {
  Slot.find({})
    .then((slots) => res.json(slots))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/book-slot").post((req, res) => {
  const slotNumber = req.body.slotNumber;
  const shipment = req.body.shipment;
  const toMail = req.body.toMail;

  const updateSlot = Slot.findOneAndUpdate(
    { slotNumber: slotNumber },
    { shipment: shipment, isAvailable: false }
  );

  const updateShipment = Shipment.findOneAndUpdate(
    { shipmentNumber: shipment },
    { isAllotted: true }
  );

  Promise.all([updateSlot, updateShipment])
    .then(() => res.json("Slot Booked!"))
    .catch((err) => console.log("Error: " + err));

  sendMail(toMail, slotNumber, shipment);
});

module.exports = router;
