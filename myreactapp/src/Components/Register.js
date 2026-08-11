import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    for (let key in form) {
      if (!form[key]) {
        setMessage("All fields are required!");
        return;
      }
    }

    try {
      // Send data to backend
      const response = await axios.post("http://localhost:8081/users/add", {
        name: form.name,
        email: form.email,
        phoneno: form.phoneno,
        password: form.password,
        address: form.address,
      });

      if (response.data) {
        setMessage("Registration successful!");
        setForm({
          name: "",
          email: "",
          phoneno: "",
          password: "",
          address: "",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage("Registration failed. Try again!");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="phoneno"
            placeholder="Phone Number"
            value={form.phoneno}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Address"
            rows="2"
            value={form.address}
            onChange={handleChange}
          ></textarea>

          {message && (
            <p
              style={{
                color: message.includes("successful") ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {message}
            </p>
          )}

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
