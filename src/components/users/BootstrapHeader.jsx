import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { toast } from "sonner"; 
import "react-toastify/dist/ReactToastify.css";

function BootstrapHeader() {
  const socket = useSocket();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userData.userId);
  const token = sessionStorage.getItem("userAccessToken");

  useEffect(() => {

    if (socket) {
      socket.on("incomingCall", (data) => {
        const { callerName, callerId } = data;

        if (callerId === userId) {
        toast.info(`Incoming call from ${callerName}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      });
    }

    return () => {
      if (socket) {
        socket.off("incomingCall");
      }
    };
  }, [socket]);

  const handleSignIn = () => {
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="nav-bar d-flex justify-content-between align-items-center bg-transparent px-4 pb-3 mt-1 w-100">
        <div className="header-logo">
          <h1 className="mb-0 gradient-text">FitFusion</h1>
        </div>
        <div className="header-nav-list">
          <ul
            className="nav d-flex flex-row align-items-center flex-nowrap"
            style={{ height: "100%", alignItems: "center" }}
          >
            <li
              className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
            >
              <Link className="nav-link text-white text-md text-sm" to="/">
                Home
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/tutorials" ? "active" : ""
              }`}
            >
              <Link className="nav-link text-white text-md text-sm" to="/tutorials">
                Tutorials
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/trainer-list" ? "active" : ""
              }`}
            >
              <Link className="nav-link text-white text-md text-sm" to="/trainer-list">
                Trainers
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

      <style>
        {`
          @media (max-width: 768px) {
            .nav-bar {
              padding: 0.5rem;
            }
            .nav-link {
              font-size: 0.85rem;
              padding-left: 0.5rem;
              padding-right: 0.5rem;
            }
          }
          @media (max-width: 576px) {
            .nav-link {
              font-size: 0.75rem;
              padding-left: 0.3rem;
              padding-right: 0.3rem;
            }
            h1 {
              font-size: 1.5rem;
            }
          }
        `}
      </style>
    </>
  );
}

export default BootstrapHeader;
