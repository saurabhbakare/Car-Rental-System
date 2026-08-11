import React from "react";
import "./ContactUs.css";

export default function ContactUs() { 
  return (
    <div className="contact-container">

      <h1>Contact Us</h1>
      <p className="contact-subtext">
        Have questions or need help with booking? We are here 24/7.
      </p>

      <div className="contact-flex">

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send us a message</h2>

          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Phone Number" required />

            <select>
              <option>Select Inquiry Type</option>
              <option>Car Booking</option>
              <option>Payment Issue</option>
              <option>General Support</option>
              <option>Other</option>
            </select>

            <textarea placeholder="Your Message..." rows="5"></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="contact-details">
          <h2>Get in Touch</h2>

          <p>
            📍 <strong>Address:</strong> Kothrud, Pune, Maharashtra – 411038
          </p>
          <p>
            📞 <strong>Landline:</strong> +1(123)-456-7890
          </p>
          <p>
            📧 <strong>Email:</strong> s2m@carrental.com
          </p>

          <h3>Business Hours</h3>
          <ul>
            <li>Mon – Fri: 9:00 AM – 9:00 PM</li>
            <li>Saturday: 10:00 AM – 6:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>

          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>

    </div>
  );
}
