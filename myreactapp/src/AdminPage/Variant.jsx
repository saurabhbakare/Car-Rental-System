import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "./Variant.css";

export default function Variant() {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState("");
  const [editingCarId, setEditingCarId] = useState(null);
  const [editForm, setEditForm] = useState({
    variantName: "",
    company: "",
    year: "",
    fuelType: "",
    seatCapacity: "",
    rentPerDay: "",
    ac: "",
    image: null
  });

  const navigate = useNavigate(); // ✅ initialize navigate

  // Fetch all cars
  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/cars/all");
      if (res.data.success) {
        setCars(res.data.data);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error fetching cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const deleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this variant?")) return;
    try {
      const res = await axios.delete(`http://localhost:8081/api/cars/delete/${id}`);
      setMessage(res.data.message);
      fetchCars();
    } catch (err) {
      console.error(err);
      setMessage("Delete failed");
    }
  };

  const startEdit = (car) => {
    setEditingCarId(car.id);
    setEditForm({
      variantName: car.variantName,
      company: car.company,
      year: car.year,
      fuelType: car.fuelType,
      seatCapacity: car.seatCapacity,
      rentPerDay: car.rentPerDay,
      ac: car.ac,
      image: null
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm({ ...editForm, image: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const submitUpdate = async (id) => {
    const formData = new FormData();
    for (let key in editForm) {
      if (editForm[key] !== null) formData.append(key, editForm[key]);
    }

    try {
      const res = await axios.put(`http://localhost:8081/api/cars/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage(res.data.message);
      setEditingCarId(null);
      fetchCars();
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
    }
  };

  const getImageSrc = (image) => {
    if (!image) return null;
    const bytes = image instanceof Array ? image : image.data || image;
    return `data:image/jpeg;base64,${btoa(
      new Uint8Array(bytes).reduce((data, byte) => data + String.fromCharCode(byte), "")
    )}`;
  };

  return (
    <div className="variant-container">
      {/* ✅ Close button */}
      <button
        className="close-cross-btn"
        onClick={() => navigate("/admindashboard")}
      >
        ✖
      </button>

      <h2>Car Variants</h2>
      {message && <p className="message">{message}</p>}

      <table className="variant-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Variant Name</th>
            <th>Company</th>
            <th>Year</th>
            <th>Fuel Type</th>
            <th>Seats</th>
            <th>Rent/Day</th>
            <th>AC</th>
            {/* <th>Image</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              {editingCarId === car.id ? (
                <>
                  <td>
                    <input type="text" name="variantName" value={editForm.variantName} onChange={handleEditChange} />
                  </td>
                  <td>
                    <input type="text" name="company" value={editForm.company} onChange={handleEditChange} />
                  </td>
                  <td>
                    <input type="number" name="year" value={editForm.year} onChange={handleEditChange} />
                  </td>
                  <td>
                    <input type="text" name="fuelType" value={editForm.fuelType} onChange={handleEditChange} />
                  </td>
                  <td>
                    <input type="number" name="seatCapacity" value={editForm.seatCapacity} onChange={handleEditChange} />
                  </td>
                  <td>
                    <input type="number" name="rentPerDay" value={editForm.rentPerDay} onChange={handleEditChange} />
                  </td>
                  <td>
                    <select name="ac" value={editForm.ac} onChange={handleEditChange}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                  <td>
                    <input type="file" name="image" onChange={handleEditChange} />
                  </td>
                  <td>
                    <button className="btn update" onClick={() => submitUpdate(car.id)}>Save</button>
                    <button className="btn delete" onClick={() => setEditingCarId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{car.variantName}</td>
                  <td>{car.company}</td>
                  <td>{car.year}</td>
                  <td>{car.fuelType}</td>
                  <td>{car.seatCapacity}</td>
                  <td>{car.rentPerDay}</td>
                  <td>{car.ac}</td>
                  {/* <td>
                    {car.image ? (
                      <img src={getImageSrc(car.image)} alt={car.variantName} className="variant-image" />
                    ) : (
                      "No Image"
                    )}
                  </td> */}
                  <td>
                    <button className="btn update" onClick={() => startEdit(car)}>Update</button>
                    <button className="btn delete" onClick={() => deleteCar(car.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
