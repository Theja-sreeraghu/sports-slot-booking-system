const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot");

// GET all slots
router.get("/", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD new slot (Admin)
router.post("/", async (req, res) => {
  try {
    const newSlot = new Slot(req.body);
    const savedSlot = await newSlot.save();
    res.status(201).json(savedSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;