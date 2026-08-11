import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Get user from localStorage
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const email = userFromStorage?.email;

  useEffect(() => {
    if (!email) {
      setMessage("User not logged in!");
      setLoading(false);
      return;
    }

    // Optional: fetch fresh data from backend
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/users/email/${email}`
        );
        if (response.data) {
          setUser(response.data);
        } else {
          setMessage("User not found!");
        }
      } catch (error) {
        console.error(error);
        // fallback to localStorage data if backend fails
        setUser(userFromStorage || null);
        if (!userFromStorage) setMessage("Error fetching profile!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email, userFromStorage]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove the whole user object
    window.location.href = "/";
  };

  const goBackHome = () => {
    window.location.href = "/home";
  };

  if (loading) {
    return (
      <h2
        style={{ color: "white", textAlign: "center", marginTop: "50px" }}
      >
        Loading profile...
      </h2>
    );
  }

  if (message) {
    return (
      <h2
        style={{ color: "red", textAlign: "center", marginTop: "50px" }}
      >
        {message}
      </h2>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>User Profile</h1>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phoneno}</p>
        <p><strong>Address:</strong> {user?.address}</p>

        <div className="button-row">
          <button className="home-btn" onClick={goBackHome}>
            ⬅ Back to Home
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
