import React from 'react';
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { FaCalculator } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdManageAccounts, MdSupportAgent, MdOutlineLogout, MdDashboard } from "react-icons/md";
import "../../assets/styles/admin/AdminSideBar.css";

function AdminSideBar({ setActiveComponent, activeComponent }) {
  const sidebarItems = [
    { icon: <MdDashboard />, label: 'Dashboard', component: 'dashboard' },
    { icon: <MdManageAccounts />, label: 'User Management', component: 'userManagement' },
    { icon: <LiaChalkboardTeacherSolid />, label: 'Trainer Management', component: 'trainerManagement' },
    { icon: <MdSupportAgent />, label: 'Support', component: 'support' },
    { icon: <IoMdSettings />, label: 'Settings', component: 'settings' },
    { icon: <MdOutlineLogout />, label: 'Logout', component: 'logout' },
  ];

  return (
    <div className="admin-sidebar">
      {sidebarItems.map(item => (
        <div
          key={item.label}
          className={`admin-sidebar-list ${activeComponent === item.component ? 'active' : ''}`}
          onClick={() => setActiveComponent(item.component)}
        >
          <p>
            {item.icon}
            <span>{item.label}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminSideBar;
