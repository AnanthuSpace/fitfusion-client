import React, { useState } from "react";
import "../../assets/styles/trainers/TrainerSignup.css";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trainerRegistration } from "../../redux/trainers/trainerThunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TrainerSignup() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { isLoading } = useSelector((state) => state.trainer); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(trainerRegistration({
      name,
      email,
      password,
      confirmPass,
    }))
    .then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/trainer-otp");
      }
    })
  };

  return (
    <>
      <ToastContainer />
      <div className="trainer-signup-container">
        <div className="trainer-signup-div">
          <div className="trainer-signup-icon">
            <img src="/Trainer-signup.jpg" alt="" />
            <u><p onClick={() => navigate("/trainer")}>Already have an account?</p></u>
          </div>
          <div className="trainer-signup-form">
            <h1>Sign up</h1>
            <input
              type="text"
              className="trainer-signup-input"
              placeholder="Full name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <hr />
            <input
              type="text"
              className="trainer-signup-input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <hr />
            <input
              type="password"
              className="trainer-signup-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <hr />
            <input
              type="password"
              className="trainer-signup-input"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <hr />
            <button className="trainer-signup-button" onClick={handleSubmit}>
              Sign Up
            </button>
            <div className="or-signup">
              <u><p>Or sign up with</p></u>
              <FcGoogle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainerSignup;
