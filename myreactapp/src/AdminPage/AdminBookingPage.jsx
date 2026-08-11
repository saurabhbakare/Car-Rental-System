import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminBookingPage.css";

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8081/booking/all");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveBooking = async (id) => {
    try {
      await axios.put(`http://localhost:8081/booking/status/${id}?status=APPROVED`);
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === id ? { ...b, status: "APPROVED" } : b
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to approve booking!");
    }
  };

  // ⭐ OPEN REASON POPUP ⭐
  const openRejectPopup = (id) => {
    setSelectedBookingId(id);
    setRejectReason("");
    setShowReasonModal(true);
  };

  // ⭐ SUBMIT REJECTION WITH REASON ⭐
  const submitReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason!");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8081/booking/reject/${selectedBookingId}?reason=${rejectReason}`
      );

      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === selectedBookingId
            ? { ...b, status: "REJECTED", rejectReason }
            : b
        )
      );

      setShowReasonModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to reject booking!");
    }
  };

  return (
    <div className="admin-booking-container">
      {/* Close Button */}
      <button className="close-cross-btn" onClick={() => navigate("/admindashboard")}>
        ✖
      </button>

      <h2>All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="admin-booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Car Variant</th>
                <th>Pickup Date</th>
                <th>Return Date</th>
                <th>Total Days</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Reject Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.user?.name || "N/A"}</td>
                  <td>{b.carVariant || "N/A"}</td>
                  <td>{b.pickupDate}</td>
                  <td>{b.returnDate}</td>
                  <td>{b.totalDays}</td>
                  <td>₹{b.totalAmount}</td>

                  <td
                    style={{
                      color:
                        b.status === "APPROVED"
                          ? "green"
                          : b.status === "PENDING"
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {b.status}
                  </td>

                  <td>{b.rejectReason || "—"}</td>

                  <td>
                    {b.status === "PENDING" && (
                      <>
                        <button onClick={() => approveBooking(b.bookingId)}>
                          Approve
                        </button>

                        <button onClick={() => openRejectPopup(b.bookingId)}>
                          Reject
                        </button>
                      </>
                    )}

                    {(b.status === "APPROVED" || b.status === "REJECTED") && <span>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ⭐ REJECTION REASON POPUP ⭐ */}
      {showReasonModal && (
        <div className="reason-modal">
          <div className="reason-box">
            <h3>Enter Reject Reason</h3>

            <textarea
              placeholder="Enter reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <div className="reason-buttons">
              <button className="submit-btn" onClick={submitReject}>
                Submit
              </button>
              <button className="cancel-btn" onClick={() => setShowReasonModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
