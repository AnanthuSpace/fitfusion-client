import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerSideBar.css";
import { IoMdLogOut, IoIosSend } from "react-icons/io";
import { FaHome, FaUsers, FaDumbbell,FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { trainerLogout } from "../../redux/trainers/trainerSlice";
import { useNavigate, useLocation } from "react-router-dom";

function TrainerSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const Logout = () => {
    dispatch(trainerLogout());
    navigate("/trainer");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="b text-light d-flex flex-column align-items-center py-3"
      style={{ width: "60px", backgroundColor: "#101113" }}
    >
      <div className="mb-4">
        {/* Ensure FaDumbbell icon is always white */}
        <FaDumbbell
          className="fs-2 text-white"
          onClick={() => navigate("/trainer-console")}
        />
      </div>
      <ul className="nav flex-column text-center">
        <li className="nav-item my-3">
          <FaHome
            className={`fs-4 ${
              isActive("/trainer-console") ? "text-white" : "text-secondary"
            }`}
            onClick={() => navigate("/trainer-console")}
          />
        </li>
        <li className="nav-item my-3">
          <FaUserCircle
            className={`fs-4 ${
              isActive("/trainer-profile") ? "text-white" : "text-secondary"
            }`}
            onClick={() => navigate("/trainer-profile")}
          />
        </li>
        <li className="nav-item my-3">
          <FaUsers
            className={`fs-4 ${
              isActive("/customers") ? "text-white" : "text-secondary"
            }`}
            onClick={() => navigate("/customers")}
          />
        </li>
        <li className="nav-item my-3">
          <IoIosSend
            className={`fs-4 ${
              isActive("/trainer-chat") ? "text-white" : "text-secondary"
            }`}
            onClick={() => navigate("/trainer-chat")}
          />
        </li>
        <li className="nav-item my-3">
          <IoMdLogOut className="fs-4 text-secondary" onClick={Logout} />
        </li>
      </ul>
    </div>
  );
}

export default TrainerSideBar;
