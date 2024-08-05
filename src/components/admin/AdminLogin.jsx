import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import "../../assets/styles/admin/AdminLogin.css";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../redux/admin/adminThunk";

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    dispatch(adminLogin({ username, password })).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        navigate("/admin-dashboard");
      }
    });
  };
  return (
    <>
    <AdminNavBar />
      <div className="admin-login-container">
        <div className="admin-login-div">
          <h1>Admin Login</h1>
          <input
            className="admin-login-input"
            type="text"
            placeholder="User name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="admin-login-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="admin-login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
