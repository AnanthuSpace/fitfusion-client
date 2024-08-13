import React, { useState } from "react";
import "../../assets/styles/trainers/TrainerLogin.css";
import { HiMiniUser } from "react-icons/hi2";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trainerLogin, requestOtp } from "../../redux/trainers/trainerThunk";

function TrainerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.trainer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    const emailId = email.toLowerCase();
    dispatch(trainerLogin({ email: emailId, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/trainer-console");
      }
    });
  };

  const handleForgotPassword = () => {
    setShowEmailModal(true);
  };

  const handleEmailSubmit = () => {
    dispatch(requestOtp(email)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log("OTP sent to email:", email);
        setShowEmailModal(false); 
        setShowOtpModal(true);
      } else {
        console.error("Failed to send OTP:", result.payload);
      }
    });
  };

  const handleOtpSubmit = () => {
    console.log("OTP entered:", otp);
    setShowOtpModal(false); 
  };

  return (
    <>
      <div className="trainer-login-container">
        <div className="trainer-login-div">
          <div className="trainer-login-icon">
            <img src="/Login-image.png" alt="Login" />
            <u>
              <p onClick={() => navigate("/trainer-signup")}>
                Create an account
              </p>
            </u>
          </div>
          <div className="trainner-login-form">
            <h1>Sign in</h1>
            <div className="input-and-icon">
              <HiMiniUser />
              <input
                type="text"
                className="trainer-login-input"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <hr />
            <div className="input-and-icon">
              <RiLockPasswordFill />
              <input
                type="password"
                className="trainer-login-input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <hr />
            <button className="trainer-login-button" onClick={handleSubmit}>
              {isLoading ? "Loading..." : "Login"}
            </button>

            <div className="or-login text-center mt-4">
              <u>
                <p>Or login with Google</p>
              </u>
              {/* <FcGoogle className="d-block mx-auto" /> */}
              {/* <u>
                <p className="text-start" onClick={handleForgotPassword}>Forgot password</p>
              </u> */}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Email Modal */}
      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5 className="text-center text-white">Forgot Password</h5>
            <div className="modal-body">
              <label htmlFor="email" className="form-label mt-4">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-black"
                onClick={() => setShowEmailModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-submit" onClick={handleEmailSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5 className="text-center text-white">OTP Verification</h5>
            <div className="modal-body">
              <label htmlFor="otp" className="form-label mt-4">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="form-control"
                placeholder="Enter 4-digit OTP"
                maxLength="4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-black"
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-submit" onClick={handleOtpSubmit}>
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TrainerLogin;
