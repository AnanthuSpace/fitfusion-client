import React from "react";
import TrainerManagement from "../../components/admin/TrainerManagement";
import AdminSideNav from "../../components/admin/AdminSideNav";
import NavBar from "../../components/admin/NavBar";

function AdminTrainerPage() {
  return (
    <>
      <div className="d-flex vh-100">
        <AdminSideNav />
        <div className="flex-grow-1 d-flex flex-column">
          <NavBar />
          <TrainerManagement />
        </div>
      </div>
    </>
  );
}

export default AdminTrainerPage;
