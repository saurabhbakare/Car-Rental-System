import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LandingPage.css";

import AboutUs from "../LandingAbout/About/AboutUs";
import ContactUs from "../LandingAbout/contact/ContactUs";
import Services from "../LandingAbout/Service/Services";

export default function LandingPage() {
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState("user");
  const [message, setMessage] = useState("");

  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showServices, setShowServices] = useState(false);

  // User Login
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // Admin Login
  const [adminLogin, setAdminLogin] = useState({
    adminemail: "",
    password: "",
  });

  // Registration
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
    address: "",
  });

  //  STRONG PASSWORD VALIDATION FUNCTION (Only for users)
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // -------------------------------
  // USER LOGIN HANDLER
  // -------------------------------
  const handleUserLogin = async () => {
    if (!userLogin.email || !userLogin.password) {
      setMessage("Enter email and password");
      return;
    }

    //  Password Format Check
    if (!validatePassword(userLogin.password)) {
      setMessage("Invalid password please try again!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/users/login",
        userLogin
      );

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      } else {
        setMessage("Invalid User Email or Password");
      }
    } catch (error) {
      console.error(error);
      setMessage("Login failed! Try again.");
    }
  };

  // -------------------------------
  // ADMIN LOGIN HANDLER (VALIDATION REMOVED)
  // -------------------------------
  const handleAdminLogin = async () => {
    if (!adminLogin.adminemail || !adminLogin.password) {
      setMessage("Enter admin email and password");
      return;
    }

    //  Removed admin password validation! (ALLOW ANY PASSWORD FORMAT)

    try {
      const response = await axios.post(
        "http://localhost:8081/admin/login",
        adminLogin
      );

      if (response.data) {
        navigate("/admindashboard");
      } else {
        setMessage("Invalid Admin Email or Password!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Invalid Admin Email or Password!");
    }
  };

  // -------------------------------
  // USER REGISTRATION HANDLER
  // -------------------------------
  const handleUserRegister = async (e) => {
    e.preventDefault();

    for (let key in userRegister) {
      if (!userRegister[key]) {
        setMessage("All fields are required!");
        return;
      }
    }

    //  Registration Password Check
    if (!validatePassword(userRegister.password)) {
      setMessage(
        "Password must be 8+ chars, include Uppercase, Lowercase, Number & Special character."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/users/add",
        userRegister
      );

      if (response.data) {
        setMessage("Registration successful!");

        setUserRegister({
          name: "",
          email: "",
          phoneno: "",
          password: "",
          address: "",
        });

        setTimeout(() => {
          setMessage("");
          setActiveForm("user");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage("Registration failed. Try again!");
    }
  };

  return (
    <div
      className="landing-hero"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/book.jpg)`,
      }}
    >
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">CaRs</div>
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>

          <li>
            <button className="nav-btn-link" onClick={() => setShowAbout(true)}>
              ABOUT
            </button>
          </li>

          <li>
            <button className="nav-btn-link" onClick={() => setShowServices(true)}>
              SERVICES
            </button>
          </li>

          <li>
            <button className="nav-btn-link" onClick={() => setShowContact(true)}>
              CONTACT
            </button>
          </li>
        </ul>

        <div className="nav-buttons">
          <button
            onClick={() => {
              setActiveForm("user");
              setMessage("");
            }}
          >
            USER LOGIN
          </button>

          <button
            onClick={() => {
              setActiveForm("admin");
              setMessage("");
            }}
          >
            ADMIN LOGIN
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Rent Your <br /><span className="highlight">Dream Car</span>
          </h1>
          <p>
            Live the life of Luxury.<br />
            Rent a car from our vast collection.<br />
            Enjoy your journey with comfort and style.
          </p>
        </div>

        {/* FORM BOX */}
        <div className="form-box">
          {message && <p className="form-message">{message}</p>}

          {/* USER LOGIN */}
          {activeForm === "user" && (
            <>
              <h2>User Login</h2>

              <input
                type="email"
                placeholder="Enter Email"
                value={userLogin.email}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={userLogin.password}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, password: e.target.value })
                }
              />

              <button onClick={handleUserLogin}>Login</button>

              <div className="signup">
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setMessage("");
                    setActiveForm("register");
                  }}
                >
                  Sign up here
                </button>
              </div>
            </>
          )}

          {/* ADMIN LOGIN */}
          {activeForm === "admin" && (
            <>
              <h2>Admin Login</h2>

              <input
                type="email"
                placeholder="Enter Admin Email"
                value={adminLogin.adminemail}
                onChange={(e) =>
                  setAdminLogin({ ...adminLogin, adminemail: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Enter Admin Password"
                value={adminLogin.password}
                onChange={(e) =>
                  setAdminLogin({ ...adminLogin, password: e.target.value })
                }
              />

              <button onClick={handleAdminLogin}>Login</button>
            </>
          )}

          {/* USER REGISTER */}
          {activeForm === "register" && (
            <form onSubmit={handleUserRegister}>
              <h2>Create Account</h2>

              <input
                type="text"
                placeholder="Full Name"
                value={userRegister.name}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                value={userRegister.email}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, email: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Phone Number"
                value={userRegister.phoneno}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, phoneno: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={userRegister.password}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, password: e.target.value })
                }
              />

              <textarea
                placeholder="Address"
                rows="2"
                value={userRegister.address}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, address: e.target.value })
                }
              ></textarea>

              <button type="submit" className="login-btn">
                Register
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ABOUT */}
      {showAbout && (
        <div className="overlay-about">
          <AboutUs />
          <button className="close-about" onClick={() => setShowAbout(false)}>
            HOME
          </button>
        </div>
      )}

      {/* CONTACT */}
      {showContact && (
        <div className="overlay-about">
          <ContactUs />
          <button className="close-about" onClick={() => setShowContact(false)}>
            HOME
          </button>
        </div>
      )}

      {/* SERVICES */}
      {showServices && (
        <div className="overlay-about">
          <Services />
          <button className="close-about" onClick={() => setShowServices(false)}>
            HOME
          </button>
        </div>
      )}
    </div>
  );
}
