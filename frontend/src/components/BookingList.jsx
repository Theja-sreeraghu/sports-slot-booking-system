import React, { useEffect, useState } from "react";
import axios from "axios";

function BookingList() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="section">
      <h2>Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <strong>{booking.userName}</strong> booked slot ID: {booking.slotId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingList;