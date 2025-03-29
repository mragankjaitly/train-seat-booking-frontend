// 📁 src/components/Seats.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Seats.css";

const API = "http://localhost:5001/api/seats";

const Seats = () => {
  const [seats, setSeats] = useState([]);
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");

  const fetchSeats = async () => {
    try {
      const res = await axios.get(API);
      setSeats(res.data);
    } catch (err) {
      console.error("Error fetching seats:", err);
      setMessage("Error loading seats");
    }
  };

  const handleBook = async () => {
    setMessage("");
    const token = localStorage.getItem("token"); 

    try {
      const res = await axios.post(
        `${API}/book`,
        { count },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message + " → Seats: " + res.data.seats.join(", "));
      fetchSeats(); // Refresh after booking
    } catch (err) {
      setMessage(err.response?.data?.error || "Booking failed. Try again.");
    }
  };


  const resetBookings = async () => {
    try {
      const res = await axios.post(`${API}/reset`);
      setMessage(res.data.message);
      fetchSeats(); // Refresh the seat data
    } catch (err) {
      setMessage("Failed to reset bookings.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const getSeatClass = (seat) =>
    seat.is_booked ? "seat booked" : "seat available";

  return (
    <div className="seats-container">
      <h2>🚆 Train Seat Booking</h2>

      <div style={{ marginBottom: "16px" }}>
        <label>
          Seats to Book (1-7):{" "}
          <input
            type="number"
            min="1"
            max="7"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
        <button onClick={handleBook}>Book Seats</button>
        <button
          onClick={resetBookings}
          style={{
            marginLeft: "10px",
            backgroundColor: "#e74c3c",
            color: "#fff",
          }}
        >
          Reset Bookings
        </button>
      </div>

      {message && (
        <p>
          <strong>{message}</strong>
        </p>
      )}

      <div className="seat-map">
        {[...Array(12)].map((_, rowIdx) => (
          <div className="seat-row" key={rowIdx}>
            {seats
              .filter((s) => s.row_number === rowIdx + 1)
              .sort((a, b) => a.seat_number - b.seat_number) // ✅ Sort to keep them in order
              .map((seat) => (
                <div key={seat.seat_number} className={getSeatClass(seat)}>
                  {seat.seat_number}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seats;
