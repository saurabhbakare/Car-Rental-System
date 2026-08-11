import React, { useState } from "react";
import "./RegisterAdmin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterAdmin() {
  const [form, setForm] = useState({
    adminname: "",
    adminemail: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ⭐ STRONG PASSWORD VALIDATION
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic empty check
    for (let key in form) {
      if (!form[key]) {
        setMessage("All fields are required!");
        return;
      }
    }

    // ⭐ Password Validation
    if (!validatePassword(form.password)) {
      setMessage(
        "Password must be at least 8 characters, include Uppercase, Lowercase, Number & Special Character."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/admin/add",
        {
          adminname: form.adminname,
          adminemail: form.adminemail,
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data) {
        setMessage("Admin Registered Successfully!");

        // Reset form
        setForm({ adminname: "", adminemail: "", password: "" });

        // Navigate after 2 seconds
        setTimeout(() => {
          navigate("/admindashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error.response || error);
      setMessage("Registration failed. Try again!");
    }
  };

  const handleClose = () => {
    navigate("/admindashboard"); // Close goes back to admin dashboard
  };

  return (
    <div className="register-admin-container">
      {/* Close button */}
      <button className="close-btn" onClick={handleClose}>
        ✖
      </button>

      <h2>Register Admin</h2>

      <form className="register-admin-form" onSubmit={handleSubmit}>
        <label>Admin Name</label>
        <input
          type="text"
          name="adminname"
          placeholder="Enter admin name"
          value={form.adminname}
          onChange={handleChange}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="adminemail"
          placeholder="Enter admin email"
          value={form.adminemail}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {message && <p className="form-message">{message}</p>}

        <button type="submit" className="register-btn">
          Register Admin
        </button>
      </form>
    </div>
  );
}
