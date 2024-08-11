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
    <div className="trainer-sidebar d-flex flex-column">
      <div className="trainer-div-logo text-center w-100 fs-2 pt-3 ">
        <span></span>FitFusion
      </div>
      <div className="d-flex flex-column align-items-center w-100 pt-5">
        <div className=" shadow mb-3 trainer-sidebarlist ">
          <MdDashboard />
          <span>Dashboard</span>
        </div>
        <div className=" shadow mb-3 trainer-sidebarlist ">
          <FaUserCircle />
          <span>Profile</span>
        </div>
        <div className=" shadow mb-3 trainer-sidebarlist ">
          <IoIosChatboxes />
          <span>Chat</span>
        </div>
        <div className=" shadow mb-3 trainer-sidebarlist ">
          <FaPhotoVideo />
          <span>Videos</span>
        </div>
        <div className=" shadow mb-3 trainer-sidebarlist ">
          <MdOutlineEmojiFoodBeverage />
          <span>Diet Plans</span>
        </div>
        <div className=" shadow mb-3 trainer-sidebarlist ">
          <MdLiveTv />
          <span>Live Classes</span>
        </div>
        <div className=" shadow mb-3 trainer-sidebarlist ">
          <IoMdNotifications />
          <span>Notification</span>
        </div>
        <div className=" shadow mb-3 trainer-sidebarlist " style={{ cursor: "pointer"}}>
          <IoMdLogOut />
          <span onClick={Logout}>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default TrainerSideBar;
