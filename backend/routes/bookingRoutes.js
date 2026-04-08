const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

// BOOK a slot
router.post("/book", async (req, res) => {
  try {
    const { userId, slotId } = req.body;

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    slot.isBooked = true;
    await slot.save();

    const booking = new Booking({
      userId,
      slotId,
    });

    const savedBooking = await booking.save();

    res.status(201).json({
      message: "Slot booked successfully",
      booking: savedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CANCEL booking
router.delete("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const slot = await Slot.findById(booking.slotId);
    if (slot) {
      slot.isBooked = false;
      await slot.save();
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET bookings by userId
router.get("/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;