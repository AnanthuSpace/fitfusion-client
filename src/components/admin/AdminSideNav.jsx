import React from "react";
import { FaHome, FaUsers, FaChalkboardTeacher, FaDumbbell } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function AdminSideNav() {
  const navigate = useNavigate();
  const location = useLocation();  

  const isActive = (path) => location.pathname === path;

  return (
    <div className="b text-light d-flex flex-column align-items-center py-3" style={{ width: "60px", backgroundColor: "#101113" }}>
      <div className="mb-4">
        <FaDumbbell className="text-white fs-2" onClick={() => navigate("/admin-console")} />
      </div>
      <ul className="nav flex-column text-center">
        <li className="nav-item my-3">
          <FaHome
            className={`fs-4 ${isActive("/admin-console") ? "text-white" : "text-secondary"}`}  
            onClick={() => navigate("/admin-console")}
          />
        </li>
        <li className="nav-item my-3">
          <FaUsers
            className={`fs-4 ${isActive("/admin-user") ? "text-white" : "text-secondary"}`}  
            onClick={() => navigate("/admin-user")}
          />
        </li>
        <li className="nav-item my-3">
          <FaChalkboardTeacher
            className={`fs-4 ${isActive("/admin-trainer") ? "text-white" : "text-secondary"}`}  
            onClick={() => navigate("/admin-trainer")}
          />
        </li>
      </ul>
    </div>
  );
}

export default AdminSideNav;
