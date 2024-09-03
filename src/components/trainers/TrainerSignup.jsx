import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trainerRegistration } from "../../redux/trainers/trainerThunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/trainers/TrainerLogin.css"; 

function TrainerSignup() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { isLoading } = useSelector((state) => state.trainer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      trainerRegistration({
        name,
        email,
        password,
        confirmPass,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/trainer-otp");
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="admin-login-container trainer-gradient-bg">
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
          <div className="card p-4 glass-effect admin-login-card">
            <h3 className="card-title text-center mb-4">Sign Up</h3>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-glass"
                  id="fullName"
                  placeholder="Enter full name"
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-glass"
                  id="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmPass">Confirm Password</label>
                <input
                  type="password"
                  className="form-control form-control-glass"
                  id="confirmPass"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className="btn gradient-blue-white w-50 mx-auto d-block"
                style={{
                  border: "none",
                  color: "white",
                }}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <div className="mt-4 d-flex align-items-center justify-content-center">
              <u className="me-2">
                <p className="mb-0">Or sign up with</p>
              </u>
              <FcGoogle size={20} />
            </div>

            <u>
              <p
                className="mt-4 text-center"
                onClick={() => navigate("/trainer")}
              >
                Already have an account?
              </p>
            </u>
          </div>
        </div>

        <footer className="text-center admin-footer">
          © 2024 FITFUSION. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default TrainerSignup;
