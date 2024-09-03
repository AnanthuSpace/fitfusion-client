import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../redux/admin/adminThunk";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/admin/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(adminLogin({ username, password })).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        navigate("/admin-console");
      }
    });
  };

  return (
    <div className="admin-login-container">
      <nav className="navbar navbar-light admin-navbar">
        <div className="container">
          <span className="navbar-brand mx-auto admin-navbar-brand text-white">
            FITFUSION
          </span>
        </div>
      </nav>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="card p-4 admin-login-card">
          <h3 className="card-title text-center mb-4">Admin Login</h3>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control form-control-glass"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control form-control-glass"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn gradient-blue-white w-50 mx-auto d-block"
              style={{
                border: "none",
                color: "white",
              }}
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <footer className="text-center admin-footer">
        © 2024 FITFUSION. All rights reserved.
      </footer>
    </div>
  );
}

export default AdminLogin;
