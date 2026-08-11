import React from "react";
import "./Services.css";

export default function Services() {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Car Rental Services</h1>
      <p className="services-subtitle">
        We provide a wide range of car rental services to make your journey
        comfortable, safe, and affordable.
      </p>

      <div className="services-grid">

        <div className="service-card">
          <h2>🚘 Self-Drive Car Rentals</h2> 
          <p>
            Choose from a variety of cars and enjoy full privacy, freedom,
            and flexibility during your travel.
          </p>
        </div>

        <div className="service-card">
          <h2>🧑‍✈️ Chauffeur-Driven Rentals</h2>
          <p>
            Get a professional driver for business trips, weddings,
            events, and long-distance travel.
          </p>
        </div>

        <div className="service-card">
          <h2>🛫 Airport Pickup & Drop</h2>
          <p>
            On-time airport transfers with comfortable and well-maintained cars.
          </p>
        </div>

        <div className="service-card">
          <h2>💼 Corporate Car Rentals</h2>
          <p>
            Special rental packages for companies with flexible billing and
            premium comfort for employees.
          </p>
        </div>

        <div className="service-card">
          <h2>🚙 Outstation Trips</h2>
          <p>
            Book our cars for outstation tours, weekend getaways, and 
            long highway journeys.
          </p>
        </div>

        <div className="service-card">
          <h2>🌟 Luxury Car Rentals</h2>
          <p>
            Choose premium luxury cars for parties, weddings, celebrations,
            and VIP travel.
          </p>
        </div>

        <div className="service-card">
          <h2>📅 Monthly & Long-Term Rentals</h2>
          <p>
            Rent cars for weeks or months at discounted prices. Ideal for
            business travelers or long stays.
          </p>
        </div>

        <div className="service-card">
          <h2>🛠 24/7 Roadside Assistance</h2>
          <p>
            We provide round-the-clock breakdown assistance for a smooth 
            and worry-free journey.
          </p>
        </div>

      </div>
    </div>
  );
}
