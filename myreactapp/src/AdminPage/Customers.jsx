import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Customer.css";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/booking/admin/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div className="customer-container">
      
      {/* ❌ Close icon */}
      <button className="close-btn" onClick={() => navigate("/admindashboard")}>
        ✕
      </button>

      <div className="customer-box">
        <h2 className="section-title">Customer Booking Records</h2>

        {bookings.length === 0 ? (
          <p className="no-data">No Bookings Found</p>
        ) : (
          <table className="customer-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Car Name</th>
                <th>Pickup Date</th>
                <th>Customer Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.car?.variantName || "N/A"}</td>
                  <td>{b.pickupDate}</td>
                  <td>{b.user?.name || "N/A"}</td>
                  <td>{b.user?.email || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
