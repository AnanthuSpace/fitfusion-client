import React, { useEffect, useState } from "react";
import "../../assets/styles/users/Header.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

function Header() {
  const socket = useSocket();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("userAccessToken");
  const userId = useSelector((state)=> state.user.userData.userId)

  useEffect(() => {
    socket?.on("onCall", ({ receivedId, receiverName }) => {
      if (receivedId) {
        toast.info(
          <div>
            <p>Incoming call from {receiverName}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/user-chat")}
            >
              Go to Call
            </button>
          </div>,
          {
            autoClose: false, 
            position: "top-right",
          }
        );
      }
    });

    return () => {
      socket?.off("onCall");
    };
  }, [socket, userId, navigate]);

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
          <h1 className="gradient-text">FitFusion</h1>
        </div>
        <div className="header-nav-list">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === "/tutorials" ? "active" : ""}>
              <Link to="/tutorials">Tutorials</Link>
            </li>
            <li className={location.pathname === "/trainer-list" ? "active" : ""}>
              <Link to="/trainer-list">Trainers</Link>
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
