import React from "react";
import SlotList from "./components/SlotList";
import BookingList from "./components/BookingList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Sports Slot Booking System</h1>
      <SlotList />
      <BookingList />
    </div>
  );
}

export default App;