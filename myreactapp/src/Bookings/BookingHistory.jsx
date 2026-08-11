import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingHistory.css";

export default function BookingHistory({ onClose }) {
  const [bookings, setBookings] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userid) setUserData(storedUser);
  }, []);

  useEffect(() => {
    if (userData) {
      axios
        .get(`http://localhost:8081/booking/user/${userData.userid}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error(err));
    }
  }, [userData]);

  // CANCEL BOOKING (status update only)
  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await axios.put(
        `http://localhost:8081/booking/cancel/${bookingId}`
      );

      if (res.data) {
        alert("Booking cancelled successfully!");

        setBookings((prev) =>
          prev.map((b) =>
            b.bookingId === bookingId ? { ...b, status: "CANCELLED" } : b
          )
        );
      }
    } catch (err) {
      console.error("SERVER ERROR:", err.response?.data || err);
      alert("Failed to cancel booking!");
    }
  };

  if (!userData) return <p>Please login first to see your bookings.</p>;

  return (
    <div className="custom-popup-overlay" onClick={onClose}>
      <div className="custom-popup-card" onClick={(e) => e.stopPropagation()}>
        <button className="custom-close-btn" onClick={onClose}>✖</button>
        <h2>Your Booking History</h2>

        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="custom-history-container">
            <table className="custom-history-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Car ID</th>
                  <th>Car Variant</th>
                  <th>Pickup Date</th>
                  <th>Return Date</th>
                  <th>Total Days</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Reject Reason</th> {/* ⭐ Added */}
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>
                    <td>{b.carId}</td>
                    <td>{b.carVariant}</td>
                    <td>{b.pickupDate}</td>
                    <td>{b.returnDate}</td>
                    <td>{b.totalDays}</td>
                    <td>₹{b.totalAmount}</td>

                    <td
                      style={{
                        color:
                          b.status === "APPROVED"
                            ? "green"
                            : b.status === "REJECTED"
                            ? "red"
                            : b.status === "CANCELLED"
                            ? "gray"
                            : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {b.status}
                    </td>

                    {/* ⭐ SHOW REJECT REASON */}
                    <td style={{ color: "black", fontWeight: 500 }}>
                      {b.rejectReason || "—"}
                    </td>

                    {/* ACTION BUTTON */}
                    <td>
                      {b.status === "APPROVED" || b.status === "PENDING" ? (
                        <button
                          className="cancel-btn"
                          onClick={() => cancelBooking(b.bookingId)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <span style={{ color: "#aaa" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
