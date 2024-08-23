import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function BootstrapHeader() {
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
      <div className="nav-bar d-flex justify-content-between align-items-center bg-transparent px-4 pb-3 mt-1  w-100">
        <div className="header-logo">
          <h1 className="mb-0 gradient-text">FitFusion</h1>
        </div>
        <div className="header-nav-list">
          <ul
            className="nav d-flex align-items-center"
            style={{ height: "100%", alignItems: "center" }} 
          >
            <li
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/class" ? "active" : ""
              }`}
            >
              <Link className="nav-link text-white" to="/class">
                Class
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/trainer-list" ? "active" : ""
              }`}
            >
              <Link className="nav-link text-white" to="/trainer-list">
                Trainers
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              <Link className="nav-link text-white" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {!token ? (
          <div className="signinButtn">
            <button className="btn btn-outline-warning" onClick={handleSignIn}>
              Sign in
            </button>
          </div>
        ) : (
          <div className="icon-div" onClick={toggleSidebar}>
            <img
              src="/profile-icon.jpg"
              alt="Profile"
              className="rounded-circle border border-warning"
              style={{ width: "2.5rem", height: "2.5rem" }}
            />
          </div>
        )}
      </div>
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
    </>
  );
}

export default BootstrapHeader;
