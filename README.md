# 🚗 Car Rental Management System

A full-stack **Car Rental Management System** developed using **React.js, Spring Boot, Spring Data JPA, Hibernate, and MySQL**.

The application provides separate functionalities for **Customers and Administrators**, including vehicle management, vehicle search, booking management, booking approvals, customer management, and booking history.

---

## 📌 Project Overview

The Car Rental Management System is designed to simplify the process of renting and managing vehicles through a web-based application.

Customers can register, log in, browse available vehicles, view vehicle details, make bookings, track booking status, cancel bookings, and manage their profiles.

Administrators can manage the vehicle inventory, customers, bookings, and administrative users. Admins can also approve or reject customer bookings and provide rejection reasons.

The application follows a **client-server architecture** where the React.js frontend communicates with the Spring Boot backend through REST APIs, with MySQL used for persistent data storage.

---

# ✨ Key Features

## 1. 🏠 Landing & Navigation Pages

### Public Information

The homepage provides different information sections for customers:

- **About Us**
  - Company experience
  - Fleet information
  - Rental business details

- **Services**
  - Self-Drive Rentals
  - Outstation Rentals
  - Airport Transfers
  - Other rental services

- **Contact Us**
  - Customer inquiry form
  - Business address
  - Contact information
  - Business hours

### 🔐 Multi-Role Authentication

Separate authentication options are provided for:

- Customer/User
- Administrator

### 📝 User Registration

Customers can create new accounts with:

- Name
- Email
- Phone number
- Address
- Password

Registration includes input validation and password validation.

---

# 2. 👤 User Dashboard & Booking Flow

## 🔎 Vehicle Search & Filtering

Users can search and filter available vehicles based on:

- Company/Manufacturer name
- Vehicle availability

## 🚘 Vehicle Collection

Available vehicles are displayed in a collection/grid containing information such as:

- Company/Manufacturer
- Manufacturing Year
- Fuel Type
- Seating Capacity
- Daily Rental Price

## 📋 Interactive Vehicle Details

Users can select a vehicle to view detailed information including:

- Vehicle specifications
- AC type
- Fuel type
- Seating capacity
- Rental price
- Vehicle images

---

## 📅 Smart Booking System

The booking form includes validation and automatic calculations.

### Booking Validations

- Past dates cannot be selected.
- Return date cannot be earlier than pickup date.
- Pickup and return dates are validated before booking.

### Automatic Calculation

The system dynamically calculates:

```text
Total Rental Days
        ×
Daily Rental Price
        =
Total Booking Amount
