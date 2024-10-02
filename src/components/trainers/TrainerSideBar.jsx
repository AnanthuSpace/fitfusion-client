import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerSideBar.css";
import { IoIosSend } from "react-icons/io";
import { FaHome, FaUsers, FaDumbbell, FaUserCircle } from "react-icons/fa";
import { MdOutlineFastfood, MdOutlineVideoLibrary } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCircleDollarToSlot } from "react-icons/fa6";

function TrainerSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="b text-light d-flex flex-column align-items-center py-3"
      style={{ width: "60px", backgroundColor: "#101113" }}
    >
      <div className="mb-4">
        <FaDumbbell
          className="fs-2 text-white"
          onClick={() => navigate("/trainer-profile")}
        />
      </div>
      <ul className="nav flex-column text-center">
        {/* <li className="nav-item my-3">
          <FaHome
            className={`fs-4 ${
              isActive("/trainer-console") ? "text-white" : "text-secondary"
            }`}
            onClick={() => navigate("/trainer-console")}
          />
        </li> */}
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
          <MdOutlineFastfood
            className={`fs-4 ${
              isActive("/diet") ? "text-white" : "text-secondary"
            }`}
            onClick={() => navigate("/diet")}
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
          <MdOutlineVideoLibrary
            className={`fs-4 ${
              isActive("/videos") ? "text-white" : "text-secondary"
            }`}
            onClick={() => navigate("/videos")}
          />
        </li>
        <li className="nav-item my-3">
          <FaCircleDollarToSlot
            className={`fs-4 ${
              isActive("/transaction-history") ? "text-white" : "text-secondary"
            }`}
            onClick={() => navigate("/transaction-history")}
          />
        </li>
      </ul>
    </div>
  );
}

export default TrainerSideBar;
