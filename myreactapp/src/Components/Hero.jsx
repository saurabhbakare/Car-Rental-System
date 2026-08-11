import React, { useState } from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Hero({ activeForm, setActiveForm }) {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8081/admin/login", {
        adminemail: adminEmail,
        password: adminPassword,
      });

      if (response.data) {
        navigate("/admindashboard"); // success
      }
    } catch (err) {
      setError("Invalid Email or Password!");
    }
  };

  return (
    <div className="hero-container">
      <div className="content-left">
        <h1>Rent Your</h1>
        <h1 className="highlight">Dream Car</h1>
        <p>Live the life of Luxury.</p>
      </div>

      <div className="login-box">
        {activeForm === "admin" && (
          <>
            <h2>Admin Login</h2>
            <input
              type="email"
              placeholder="Enter Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            {error && <p className="form-error">{error}</p>}
            <button className="login-btn" onClick={handleAdminLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
