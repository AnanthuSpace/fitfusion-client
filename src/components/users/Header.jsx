import React, { useEffect, useState } from "react";
import "../../assets/styles/users/Header.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { inactive } from "../../redux/users/userThunk";
import { userLogout } from "../../redux/users/userSlice";
import { toast } from "sonner";

function Header() {
  const socket = useSocket();
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("userAccessToken");
  const userId = useSelector((state)=> state.user.userData.userId)

  const deActive = () => {
    if (!userId) {
      console.error("userId is undefined");
      dispatch(userLogout());
      navigate("/login");
      return;
    }
    dispatch(inactive({ userId })).then((res) => {
      console.log();
      if (res.payload.message === "User is inactive") {
        dispatch(userLogout());
        navigate("/login");
      }
    });
  };

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
  }, [socket, navigate]);

  useEffect(() => {
    socket.on("isUserBlocked", (data) => {
      const { blockedId } = data;
      if (blockedId === userId) {
        toast.error(`You are blocked by admin`);
        deActive();
      }
    });
  }, []);

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
