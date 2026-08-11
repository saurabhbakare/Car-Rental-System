import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Hero from "../Components/Hero";
import Register from "../Components/Register";
import Navbar from "../Components/Navbar";

export default function LandingParent() {
  const [activeForm, setActiveForm] = useState("user");

  return (
    <div className="landing-background">
      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* Navbar ALWAYS visible */}
      <Navbar setActiveForm={setActiveForm} />

      {/* Page Content */}
      <div className="content-wrapper" style={{ zIndex: 2, width: "100%" }}>
        <Routes>
          <Route
            path="/"
            element={<Hero activeForm={activeForm} setActiveForm={setActiveForm} />}
          />
          <Route
            path="/register"
            element={<Register setActiveForm={setActiveForm} />}
          />
        </Routes>
      </div>
    </div>
  );
}
