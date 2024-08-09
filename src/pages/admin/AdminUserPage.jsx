import React from 'react'
import AdminSideNav from "../../components/admin/AdminSideNav";
import NavBar from "../../components/admin/NavBar";
import UserManagement from '../../components/admin/UserManagement';

function AdminUserPage() {
  return (
    <>
      <div className="d-flex vh-100">
        <AdminSideNav />
        <div className="flex-grow-1 d-flex flex-column">
          <NavBar />
          <UserManagement />
        </div>
      </div>
    </>
  )
}

export default AdminUserPage