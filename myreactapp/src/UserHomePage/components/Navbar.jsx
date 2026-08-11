import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import BookingHistory from "../../Bookings/BookingHistory";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [showBookings, setShowBookings] = useState(false); // popup state

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userid && storedUser.userid !== 0) {
      setUser(storedUser);
    }
  }, []);

  // FIXED SEARCH FUNCTION ✔✔✔
  const handleSearch = (e) => {
    e.preventDefault();
    const text = searchTerm.trim();

    if (text === "") {
      // empty search → show all cars
      navigate("/home");
    } else {
      // search particular company
      navigate(`/home?company=${encodeURIComponent(text)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); 
  };

  return (
    <>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.jpg" alt="logo" />
          <h2>Car Rental System</h2>
        </div>

        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Cars here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="links">
          <button
            className="link-btn"
            onClick={() => {
              if (!user) alert("Please login first");
              else setShowBookings(true);
            }}
          >
            My Bookings
          </button>

          <button className="link-btn" onClick={() => navigate("/profile")}>
            My Profile
          </button>

          <button className="link-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* BookingHistory Popup */}
      {showBookings && (
        <BookingHistory onClose={() => setShowBookings(false)} />
      )}
    </>
  );
}
