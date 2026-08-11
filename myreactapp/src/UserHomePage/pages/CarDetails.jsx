import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/cars/${id}`)
      .then((res) => {
        if (res.data.success) {
          setCar(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!car)
    return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  // -----------------------------
  //  BOOK NOW HANDLER
  // -----------------------------
  const handleBooking = () => {
    navigate(`/book/${car.id}`, {
      state: { car }, // passing full car object
    });
  };

  return (
    <div className="car-details-container">
      <div className="car-image-box">
        <img src={car.image} alt={car.variantName} />
      </div>

      <div className="car-info-box">
        <h1>
          {car.variantName} ({car.company})
        </h1>

        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Fuel Type:</strong> {car.fuelType}</p>
        <p><strong>Seat Capacity:</strong> {car.seatCapacity}</p>
        <p><strong>AC:</strong> {car.ac}</p>

        <p className="rent">
          <strong>Rent Per Day:</strong> ₹{car.rentPerDay}
        </p>

        <div className="button-group">
          <button className="book-btn" onClick={handleBooking}>
            Book Now
          </button>

          <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
