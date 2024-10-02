import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, trainerLogin } from "../../redux/trainers/trainerThunk";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { toast } from "sonner";
import "../../assets/styles/trainers/TrainerLogin.css";

function TrainerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.trainer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailId = email.toLowerCase();
    dispatch(trainerLogin({ email: emailId, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/trainer-profile");
      }
    });
  };

  const handleGoogleResponse = (response) => {
    const token = response.credential;
    if (token) {
      dispatch(googleLogin(token)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/trainer-profile");
        }
      });
    } else {
      toast.error("Google registration failed", response);
    }
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
            <h3 className="card-title text-center mb-4">Trainer Login</h3>
            <form>
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
                  "Login"
                )}
              </button>{" "}
              <br />
              <div className="d-flex justify-content-center">
                <GoogleLogin
                  onSuccess={handleGoogleResponse}
                  onError={handleGoogleResponse}
                  className="btn"
                />
              </div>
            </form>
            <u>
              <p
                className="mt-4 text-center"
                onClick={() => navigate("/trainer-signup")}
              >
                Create an account
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

export default TrainerLogin;
