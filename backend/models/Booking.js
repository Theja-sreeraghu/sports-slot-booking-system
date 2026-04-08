const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  slotId: String,
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Booked",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);