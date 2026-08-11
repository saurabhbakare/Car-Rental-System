import React from "react";
import "./Navbar.css";

export default function Navbar({ setActiveForm }) {
  return (
    <nav className="navbar">
      <div className="logo">CaRs</div>

      <ul className="menu">
        <li>HOME</li>
        <li>ABOUT</li>
        <li>SERVICES</li>
        <li>CONTACT</li>
        <li>FEEDBACK</li>
      </ul>

      <div className="nav-buttons">
        <button className="user-btn" onClick={() => setActiveForm("user")}>
          USER LOGIN
        </button>

        <button className="admin-btn" onClick={() => setActiveForm("admin")}>
          ADMIN LOGIN
        </button>
      </div>
    </nav>
  );
}
