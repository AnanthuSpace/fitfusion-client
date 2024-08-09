import React from "react";
import AdminSideNav from "../../components/admin/AdminSideNav";
import AdminDashboard from "../../components/admin/AdminDashboard";
import NavBar from "../../components/admin/NavBar";

function AdminConsole() {
  return (
    <div className="d-flex vh-100">
      <AdminSideNav />
      <div className="flex-grow-1 d-flex flex-column">
        <NavBar />
        <AdminDashboard />
      </div>
    </div>
  );
}

export default AdminConsole;
