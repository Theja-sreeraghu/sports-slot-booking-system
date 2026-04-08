import React, { useEffect, useState } from "react";
import axios from "axios";

function SlotList() {
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({
    sportName: "",
    venue: "",
    date: "",
    time: ""
  });
  const [userName, setUserName] = useState("");

  const fetchSlots = async () => {
    try {
      const res = await axios.get("http://localhost:5000/slots");
      setSlots(res.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSlot = async () => {
    try {
      await axios.post("http://localhost:5000/slots", formData);
      setFormData({
        sportName: "",
        venue: "",
        date: "",
        time: ""
      });
      fetchSlots();
      alert("Slot added successfully!");
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  };

  const bookSlot = async (slotId) => {
    if (!userName) {
      alert("Please enter your name before booking!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/bookings", {
        userName,
        slotId
      });
      alert("Slot booked successfully!");
      fetchSlots();
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Booking failed or slot already booked!");
    }
  };

  return (
    <div className="section">
      <h2>Add New Slot</h2>

      <input
        type="text"
        name="sportName"
        placeholder="Sport Name"
        value={formData.sportName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="venue"
        placeholder="Venue"
        value={formData.venue}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      />
      <button onClick={addSlot}>Add Slot</button>

      <h2>Available Slots</h2>

      <input
        type="text"
        placeholder="Enter your name to book"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      {slots.length === 0 ? (
        <p>No slots available.</p>
      ) : (
        <ul>
          {slots.map((slot) => (
            <li key={slot._id}>
              <strong>{slot.sportName}</strong> - {slot.venue} - {slot.date} - {slot.time}
              {slot.isBooked ? (
                <span style={{ color: "red", marginLeft: "10px" }}>Booked</span>
              ) : (
                <button onClick={() => bookSlot(slot._id)} style={{ marginLeft: "10px" }}>
                  Book Slot
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SlotList;