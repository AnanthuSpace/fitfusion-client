import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerSideBar.css";
import {
  MdDashboard,
  MdOutlineEmojiFoodBeverage,
  MdLiveTv,
} from "react-icons/md";
import { FaUserCircle, FaPhotoVideo } from "react-icons/fa";
import { IoIosChatboxes, IoMdNotifications, IoMdLogOut } from "react-icons/io";
import { FaHome, FaUsers, FaChalkboardTeacher, FaDumbbell } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { trainerLogout } from "../../redux/trainers/trainerSlice";
import { useNavigate } from "react-router-dom";

function TrainerSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const Logout = () => {
    dispatch(trainerLogout())
    navigate('/trainer')
  }
  return (
    <div className="b text-light d-flex flex-column align-items-center py-3" style={{ width: "60px", backgroundColor:"#101113" }}>
      <div className="mb-4">
        <FaDumbbell className="text-white fs-2" onClick={()=>navigate("/trainer-console")}/>
      </div>
      <ul className="nav flex-column text-center">
        <li className="nav-item my-3">
          <FaHome className="fs-4 text-secondary" onClick={()=>navigate("/trainer-console")}/>
        </li>
        <li className="nav-item my-3">
          <FaUsers className="fs-4 text-secondary" onClick={()=>navigate("/trainer-profile")}/>
        </li>
        <li className="nav-item my-3">
          <FaChalkboardTeacher className="fs-4 text-secondary" onClick={()=>navigate("/admin-trainer")}/>
        </li>
      </ul>
    </div>
  );
}

export default TrainerSideBar;
