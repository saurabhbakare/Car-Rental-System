import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import axios from "axios";

export default function HeroSection({ companyFilter }) {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch all cars
  useEffect(() => {
    fetch("http://localhost:8081/api/cars/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCars(data.data);
          setFilteredCars(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Apply filter
  useEffect(() => {
    let trimmed = companyFilter.trim().toLowerCase();

    if (trimmed === "") {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) =>
        car.company.toLowerCase().includes(trimmed)
      );
      setFilteredCars(filtered);
    }
  }, [companyFilter, cars]);

  // Fetch logged-in user info
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUserData(storedUser);
  }, []);

  // Booking form
  const BookingForm = ({ selectedCar, onClose }) => {
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [days, setDays] = useState(0);
    const [totalRent, setTotalRent] = useState(0);
    const [message, setMessage] = useState("");

    // ✔ Prevent past dates
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
      if (pickupDate && returnDate) {
        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (diff > 0) {
          setDays(diff);
          setTotalRent(diff * selectedCar.rentPerDay);
        } else {
          setDays(0);
          setTotalRent(0);
        }
      }
    }, [pickupDate, returnDate, selectedCar]);

    const handleBooking = async (e) => {
      e.preventDefault();

      if (!pickupDate || !returnDate) {
        setMessage("Please select pick-up and return dates!");
        return;
      }

      if (!userData) {
        setMessage("You are not logged in. Please login first.");
        return;
      }

      const bookingData = {
        userId: userData.userid || userData.id,
        carId: selectedCar.id,
        carVariant: selectedCar.variantName,
        pickupDate,
        returnDate,
        totalDays: days,
        totalAmount: totalRent,
        status: "PENDING",
      };

      try {
        await axios.post("http://localhost:8081/booking/create", bookingData);
        setMessage("Booking successful!");
        setTimeout(() => {
          onClose();
          setMessage("");
        }, 1500);
      } catch (err) {
        console.error(err);
        setMessage("Server error! Check backend or data format.");
      }
    };

    return (
      <form className="booking-box" onSubmit={handleBooking}>
        <h2>Book {selectedCar.variantName}</h2>
        {message && <p style={{ color: "yellow" }}>{message}</p>}

        <label>Pick-up Date:</label>
        <input
          type="date"
          value={pickupDate}
          min={today}     // ← 🚫 Cannot pick past dates
          onChange={(e) => setPickupDate(e.target.value)}
        />

        <label>Return Date:</label>
        <input
          type="date"
          value={returnDate}
          min={pickupDate || today}   // ← 🚫 Cannot pick before pickup date
          onChange={(e) => setReturnDate(e.target.value)}
        />

        <p>Days: {days}</p>
        <p>Total Rent: ₹ {totalRent}</p>

        <button type="submit" className="confirm-btn">
          Confirm Booking
        </button>
        <button
          type="button"
          className="back-btn"
          onClick={() => {
            onClose();
            setMessage("");
          }}
        >
          Back
        </button>
      </form>
    );
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-container">
        <div className="hero-left">
          <h2>BOOK A CAR NOW</h2>
          <h1>The Amazing Ride</h1>
          <p>
            Ride New Models Car,
            <br />
            Starting at just ₹1499/-
          </p>
          <div className="take-ride">TAKE A RIDE NOW...</div>
        </div>
        <div className="hero-right">
          <img src="/images/kia (2).png" alt="car" />
        </div>
      </div>

      {/* AVAILABLE CARS */}
      <div className="user-car-section">
        <h2 className="section-title">Available Car Variants</h2>
        <div className="user-car-grid">
          {filteredCars.length === 0 ? (
            <p className="no-data">No Cars Available Yet</p>
          ) : (
            filteredCars.map((car) => (
              <div
                key={car.id}
                className="user-car-card"
                onClick={() => {
                  if (!userData) {
                    alert("You are not logged in. Please login first.");
                    return;
                  }
                  setSelectedCar(car);
                  setShowBooking(false);
                }}
                style={{ cursor: "pointer" }}
              >
                <img src={car.image} alt={car.variantName} />
                <h3>{car.variantName}</h3>
                <p>
                  {car.company} • {car.year}
                </p>
                <p>
                  {car.fuelType} • {car.seatCapacity} Seater
                </p>
                <div className="rent">₹ {car.rentPerDay}/day</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* POPUP */}
      {selectedCar && (
        <div
          className="popup-overlay"
          onClick={() => {
            setSelectedCar(null);
            setShowBooking(false);
          }}
        >
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            {!showBooking ? (
              <>
                <button
                  className="close-btn"
                  onClick={() => {
                    setSelectedCar(null);
                    setShowBooking(false);
                  }}
                >
                  ✖
                </button>

                <img src={selectedCar.image} alt="car" className="popup-img" />
                <h2>{selectedCar.variantName}</h2>

                <p>
                  <strong>Company:</strong> {selectedCar.company}
                </p>
                <p>
                  <strong>Year:</strong> {selectedCar.year}
                </p>
                <p>
                  <strong>Fuel:</strong> {selectedCar.fuelType}
                </p>
                <p>
                  <strong>Seats:</strong> {selectedCar.seatCapacity}
                </p>

                <h3 className="popup-rent">₹ {selectedCar.rentPerDay} / day</h3>

                <button
                  className="popup-book-btn"
                  onClick={() => setShowBooking(true)}
                >
                  Book Now
                </button>
              </>
            ) : (
              <BookingForm
                selectedCar={selectedCar}
                onClose={() => setShowBooking(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
