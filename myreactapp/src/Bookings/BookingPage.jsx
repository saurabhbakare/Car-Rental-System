import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingPage({ selectedCar: propCar, onClose: propOnClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedCar = propCar || location.state?.car;
  const onClose = propOnClose || (() => navigate(-1));

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    days: "",
    carId: selectedCar?.id || "",
  });

  const [message, setMessage] = useState("");

  // Update carId if selectedCar loads or changes
  useEffect(() => {
    if (selectedCar) {
      setBookingData((prev) => ({
        ...prev,
        carId: selectedCar.id,
      }));
    }
  }, [selectedCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.days) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/bookings/add",
        bookingData
      );

      if (response.data.success) {
        setMessage("Booking Successful!");
        setTimeout(() => onClose(), 1500); // close popup
      } else {
        setMessage(response.data.message || "Booking failed!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error! Please check your backend or data format.");
    }
  };

  if (!selectedCar) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--bg-base)", color: "white" }}>
        <h2>No car selected for booking!</h2>
        <button onClick={() => navigate(-1)} style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer", background: "var(--color-primary)", border: "none", color: "#000", fontWeight: "bold", borderRadius: "4px" }}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px", backgroundColor: "var(--bg-base)" }}>
      <form className="booking-box" onSubmit={handleSubmit} style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        padding: "40px",
        borderRadius: "var(--radius-lg)",
        maxWidth: "420px",
        width: "100%",
        boxShadow: "var(--shadow-lg)",
        animation: "scaleUpFade 0.5s ease-out"
      }}>
        {message && <p style={{ color: "yellow", textAlign: "center", marginBottom: "15px" }}>{message}</p>}
        <h2 style={{ fontFamily: "var(--font-heading)", color: "white", textAlign: "center", marginBottom: "20px" }}>Book {selectedCar.variantName}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={bookingData.name}
            onChange={handleChange}
            style={{ padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "rgba(255, 255, 255, 0.03)", color: "white", fontSize: "15px", outline: "none" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={bookingData.email}
            onChange={handleChange}
            style={{ padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "rgba(255, 255, 255, 0.03)", color: "white", fontSize: "15px", outline: "none" }}
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={bookingData.phone}
            onChange={handleChange}
            style={{ padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "rgba(255, 255, 255, 0.03)", color: "white", fontSize: "15px", outline: "none" }}
          />
          <input
            type="number"
            name="days"
            placeholder="Number of Days"
            value={bookingData.days}
            onChange={handleChange}
            style={{ padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "rgba(255, 255, 255, 0.03)", color: "white", fontSize: "15px", outline: "none" }}
          />

          <button type="submit" className="confirm-btn" style={{ padding: "14px", background: "var(--color-primary)", color: "#000", border: "none", borderRadius: "var(--radius-sm)", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "var(--transition-fast)" }}>Confirm Booking</button>
          <button type="button" className="back-btn" onClick={onClose} style={{ padding: "12px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", color: "white", borderRadius: "var(--radius-sm)", cursor: "pointer", transition: "var(--transition-fast)" }}>Back</button>
        </div>
      </form>
    </div>
  );
}

