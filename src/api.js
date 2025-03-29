// src/api.js
import axios from "axios";

// ✅ Replace localhost with your deployed backend URL
const API_BASE = "https://train-seat-booking-zwvd.onrender.com/api/seats";

export const fetchSeats = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching seats:", error);
    return [];
  }
};

export const bookSeats = async (selectedSeats) => {
  try {
    const response = await axios.post(`${API_BASE}/book`, { seats: selectedSeats });
    return response.data;
  } catch (error) {
    console.error("❌ Booking failed:", error);
    throw error;
  }
};
