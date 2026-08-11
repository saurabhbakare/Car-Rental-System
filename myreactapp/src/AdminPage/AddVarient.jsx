import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddVarient.css";

export default function AddVariant() {
  const navigate = useNavigate(); // <-- Add navigate
  const [form, setForm] = useState({
    variantName: "",
    company: "",
    year: "",
    fuelType: "",
    seatCapacity: "",
    rentPerDay: "",
    ac: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  const companies = ["Hyundai", "Kia", "Toyota", "Honda","Maruti Suzuki"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    for (let key in form) {
      if (!form[key]) {
        setMessage("All fields are required!");
        return;
      }
    }

    if (!form.image) {
      setMessage("Please select an image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("variantName", form.variantName);
      formData.append("company", form.company);
      formData.append("year", form.year);
      formData.append("fuelType", form.fuelType);
      formData.append("seatCapacity", form.seatCapacity);
      formData.append("rentPerDay", form.rentPerDay);
      formData.append("ac", form.ac);
      formData.append("image", form.image);

      const response = await axios.post(
        "http://localhost:8081/api/cars/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(response.data.message);

      if (response.data.success) {
        setForm({
          variantName: "",
          company: "",
          year: "",
          fuelType: "",
          seatCapacity: "",
          rentPerDay: "",
          ac: "",
          image: null,
        });
        document.getElementById("variantImage").value = "";
      }
    } catch (error) {
      console.error("Error uploading variant:", error.response || error);
      setMessage("Error adding variant! Please try again.");
    }
  };

  return (
    <div className="add-variant-container">
      {/* Close Button */}
      <button
        className="close-cross-btn"
        onClick={() => navigate("/admindashboard")} // <-- change route if needed
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          color: "red",
        }}
      >
        ✖
      </button>

      <h2>Add Car Variant</h2>

      <form className="add-variant-form" onSubmit={handleSubmit}>
        <label>Enter Variant Name</label>
        <input type="text" name="variantName" value={form.variantName} onChange={handleChange} required />

        <label>Company</label>
        <select name="company" value={form.company} onChange={handleChange} required>
          <option value="">Select Company</option>
          {companies.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>

        <label>Year</label>
        <input type="number" name="year" value={form.year} onChange={handleChange} required />

        <label>Fuel Type</label>
        <select name="fuelType" value={form.fuelType} onChange={handleChange} required>
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="CNG">CNG</option>
          <option value="Petrol+CNG">Petrol+CNG</option>
        </select>

        <label>Seat Capacity</label>
        <input type="number" name="seatCapacity" value={form.seatCapacity} onChange={handleChange} required />

        <label>Rent per Day</label>
        <input type="number" name="rentPerDay" value={form.rentPerDay} onChange={handleChange} required />

        <label>Is AC</label>
        <select name="ac" value={form.ac} onChange={handleChange} required>
          <option value="">Select AC Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>Select Variant Image</label>
        <input type="file" name="image" id="variantImage" accept="image/*" onChange={handleChange} required />

        {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

        <button type="submit" className="add-variant-btn">Add Variant</button>
      </form>
    </div>
  );
}
