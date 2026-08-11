import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './Components/LandingPage';
import AdminDashboard from './AdminPage/AdminDashboard';
import RegisterAdmin from './AdminPage/AdminReg/RegisterAdmin';
import AddVariant from './AdminPage/AddVarient';
import Variant from './AdminPage/Variant';

import Home from './UserHomePage/pages/Home';   // USER HOME PAGE
import UserProfile from './UserHomePage/pages/UserProfile'; // USER PROFILE
import CarDetails from './UserHomePage/pages/CarDetails';

import AboutUs from './LandingAbout/About/AboutUs';
import ContactUs from './LandingAbout/contact/ContactUs';

import BookingPage from './Bookings/BookingPage';
import BookingHistory from './Bookings/BookingHistory';
import AdminBookingPage from './AdminPage/AdminBookingPage';
import Customers from './AdminPage/Customers';
import Services from './LandingAbout/Service/Services';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          {/* DEFAULT LANDING PAGE */}
          <Route path="/" element={<LandingPage />} />

          {/* ADMIN ROUTES */}
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/registeradmin" element={<RegisterAdmin />} />
          <Route path="/addvariant" element={<AddVariant />} />
          <Route path="/variant" element={<Variant />} />

          {/* USER HOME PAGE */}
          <Route path="/home" element={<Home />} />
          {/* <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/service" element={<Services />} /> */}

          {/* USER PROFILE PAGE */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/car/:id" element={<CarDetails />} />

          {/* BOOKINGS */}
          <Route path="/bookings" element={<BookingHistory />} />
          <Route path="/book/:carId" element={<BookingPage />} />
          <Route path="/admin/bookings" element={<AdminBookingPage />} />
          <Route path="/admin/customers" element={<Customers />} />
          

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;




// import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import LandingPage from './Components/LandingPage';
// import AdminDashboard from './AdminPage/AdminDashboard';
// import RegisterAdmin from './AdminPage/AdminReg/RegisterAdmin';
// import AddVariant from './AdminPage/AddVarient';
// import Variant from './AdminPage/Variant';
// import Home from './UserHomePage/pages/Home';   // 👈 USER HOME PAGE
// import UserProfile from './UserHomePage/pages/UserProfile'; // 👈 USER PROFILE
// import CarDetails from './UserHomePage/pages/CarDetails';
// import AboutUs from './LandingAbout/About/AboutUs';
// import ContactUs from './LandingAbout/contact/ContactUs';
// import BookingPage from './Bookings/BookingPage';
// import BookingHistory from './Bookings/BookingHistory';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">

//         <Routes>

//           {/* DEFAULT LANDING PAGE */}
//           <Route path="/" element={<LandingPage />} />

//           {/* ADMIN */}
//           <Route path="/admindashboard" element={<AdminDashboard />} />
//           <Route path="/registeradmin" element={<RegisterAdmin />} />
//           <Route path="/addvariant" element={<AddVariant />} />
//           <Route path="/variant" element={<Variant />} />

//           {/* USER HOME PAGE */}
//           <Route path="/home" element={<Home />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/contact" element={<ContactUs />} />

//           {/* USER PROFILE PAGE */}
//           <Route path="/profile" element={<UserProfile />} />
//           <Route path="/car/:id" element={<CarDetails />} />

//           {/* BOOKINGS */}
//           <Route path="/bookings" element={<BookingHistory />} />
//           {/* <Route path="/book/:carId" element={<BookingPage />} /> */}

//         </Routes>

//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
