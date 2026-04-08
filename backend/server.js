import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const slotSchema = new mongoose.Schema({
  sportName: String,
  venue: String,
  date: String,
  time: String,
  isBooked: { type: Boolean, default: false }
});

const Slot = mongoose.model("Slot", slotSchema);

const bookingSchema = new mongoose.Schema({
  userName: String,
  slotId: String,
  bookingDate: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

app.get("/", (req, res) => {
  res.send("Sports Slot Booking Backend Running");
});

app.get("/slots", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching slots" });
  }
});

app.post("/slots", async (req, res) => {
  try {
    const newSlot = new Slot(req.body);
    const savedSlot = await newSlot.save();
    res.status(201).json(savedSlot);
  } catch (error) {
    res.status(500).json({ message: "Error adding slot" });
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const { userName, slotId } = req.body;

    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    slot.isBooked = true;
    await slot.save();

    const booking = new Booking({ userName, slotId });
    const savedBooking = await booking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error booking slot" });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});