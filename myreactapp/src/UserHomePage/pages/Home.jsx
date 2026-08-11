import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

import { useLocation } from "react-router-dom";
import BookingHistory from "../../Bookings/BookingHistory";

export default function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const companyFilter = queryParams.get("company") || "";

  const [showBookings, setShowBookings] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Toggle Booking History display
  const handleShowBookings = () => {
    setShowBookings((prev) => !prev);
  }; 

  return (
    <>
      <Navbar onShowBookings={handleShowBookings} />

      {showBookings ? (
        <BookingHistory refresh={refresh} />
      ) : (
        <HeroSection
          companyFilter={companyFilter}
          refreshBookings={() => setRefresh((prev) => !prev)}
        />
      )}
    </>
  );
}

// const [showBookings, setShowBookings] = useState(false); // popup state
// {showBookings && <BookingHistory onClose={() => setShowBookings(false)} />}
