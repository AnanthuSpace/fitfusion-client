import React, { useState } from "react";
import "../../assets/styles/users/Header.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("userAccessToken");

  const handleSignIn = () => {
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="nav-bar">
        <div className="header-logo">
          <h1>FitFusion</h1>
        </div>
        <div className="header-nav-list">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === "/class" ? "active" : ""}>
              <Link to="/class">Class</Link>
            </li>
            <li className={location.pathname === "/trainers" ? "active" : ""}>
              <Link to="/trainers">Trainers</Link>
            </li>
            <li className={location.pathname === "/contact" ? "active" : ""}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        {!token ? (
          <div className="signinButtn">
            <button onClick={handleSignIn}>Sign in</button>
          </div>
        ) : (
          <div className="icon-div" onClick={toggleSidebar}>
            <img src="/profile-icon.jpg" alt="Profile" />
          </div>
        )}
      </div>
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
    </>
  );
}

export default Header;
