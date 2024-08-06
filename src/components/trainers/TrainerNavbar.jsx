import React from 'react';
import { IoMdNotifications } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "../../assets/styles/trainers/TrainerNavbar.css"

function TrainerNavbar() {
  return (
    <div className="d-flex justify-content-end align-items-center  trainer-navbar" >
      <div className="d-flex align-items-center me-3 trainer-short-icon">
        <IoMdNotifications size={24} />
      </div>
      <div className="d-flex align-items-center pe-4">
        <img src="/Trainer-profile.jpg" alt="Profile" className="rounded-circle" style={{ width: '2.5rem', height: '2.5rem' }} />
      </div>
    </div>
  );
}

export default TrainerNavbar;
