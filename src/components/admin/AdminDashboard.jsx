import React, { useState } from 'react';
import "../../assets/styles/admin/AdminDashBoard.css";
import AdminNavBar from './AdminNavBar';
import AdminSideBar from './AdminSideBar';
import AdminDashbordContainer from './AdminDashbordContainer';
import UserManagement from './UserManagement';
import TrainerManagement from './TrainerManagement';

function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'userManagement':
        return <UserManagement />;
      case 'trainerManagement':
        return <TrainerManagement />;
      default:
        return <AdminDashbordContainer />;
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="admin-dashboard-container">
        <div className="admin-sidebar-home">
          <AdminSideBar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
        </div>
        <div className="content-indashboard">
          {renderActiveComponent()}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
