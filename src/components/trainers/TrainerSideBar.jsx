import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerSideBar.css";

function TrainerSideBar() {
  return (
    <div className="trainer-sidebar d-flex flex-column">
      <div className="trainer-div-logo text-center w-100 fs-2 pt-3 ">
        FitFusion
      </div>
      <div className="d-flex flex-column align-items-center text-white w-100 pt-5">
        <div className=" shadow mb-3 trainer-sidebarlist ">Dashboard</div>
        <div className=" shadow mb-3 trainer-sidebarlist ">Profile</div>
        <div className=" shadow mb-3 trainer-sidebarlist ">Chat</div>
        <div className=" shadow mb-3 trainer-sidebarlist ">Videos</div>
        <div className=" shadow mb-3 trainer-sidebarlist ">Diet Plans</div>
        <div className=" shadow mb-3 trainer-sidebarlist ">Live Classes</div>
        <div className=" shadow mb-3 trainer-sidebarlist ">Notification</div>
      </div>
    </div>
  );
}

export default TrainerSideBar;
