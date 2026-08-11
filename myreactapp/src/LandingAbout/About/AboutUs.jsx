import React from "react";
import "./AboutUs.css";

export default function AboutUs() { 
  return (
    <div className="about-container">

      {/* -------- HERO SECTION -------- */}
      <section className="about-hero">
        <h1>THE BEST CAR RENTAL SERVICE IN THE CITY</h1>
        <p>
          We provide reliable, comfortable, and affordable car rental services designed 
          to make your journey smooth and stress-free. Easily browse cars, compare prices, 
          and book rides with just a few clicks.
        </p>
      </section>

      {/* -------- WHO WE ARE -------- */}
      <section className="about-flex">
        <div className="about-img-box">
          <img 
            src="/images/kia (2).png"
            alt="Car Rental"
            className="about-img"
          />
        </div>

        <div className="about-text">
          <h2>WHO WE ARE</h2>

          <p>
            Our Car Rental System is built to provide users with a simple and easy 
            way to book cars anytime, anywhere. We focus on:
          </p>

          <ul>
            <li>✔ Clean and well-maintained vehicles</li>
            <li>✔ Professional and trained drivers (if included)</li>
            <li>✔ Easy online booking and secure payments</li>
            <li>✔ Quick support for any booking-related help</li>
          </ul>

          <p>
            With continuous improvements and user-friendly features, we aim to make 
            travel convenient for everyone.
          </p>
        </div>
      </section>

      {/* -------- WHY CHOOSE US -------- */}
      <section className="why-choose">
        <h2>WHY CHOOSE US?</h2>

        <div className="why-grid">

          <div className="why-card">
            <h3>Diverse Fleet of Vehicles</h3>
            <p>
              From hatchbacks to luxury cars, we offer multiple vehicle options for all types of trips.
            </p>
          </div>

          <div className="why-card">
            <h3>Easy & Flexible Booking</h3>
            <p>
              Users can book, modify, or cancel rides with an easy and fast process.
            </p>
          </div>

          <div className="why-card">
            <h3>Affordable Pricing</h3>
            <p>
              Transparent and budget-friendly pricing without hidden charges.
            </p>
          </div>

          <div className="why-card">
            <h3>24/7 Customer Support</h3>
            <p>
              We are always available to assist you throughout your journey.
            </p>
          </div>

          <div className="why-card">
            <h3>Safe & Reliable</h3>
            <p>
              Every vehicle goes through regular inspections to ensure safe travel.
            </p>
          </div>

        </div>
      </section>

      {/* -------- EXPERIENCE BOX -------- */}
      <section className="experience">
        <h1>12+ Years of Experience</h1>
        <p>Delivering trusted, quality, and safe car rental services.</p>
      </section>

    </div>
  );
}
