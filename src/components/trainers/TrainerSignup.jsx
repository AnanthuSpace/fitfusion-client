import React from "react";
import "../../assets/styles/trainers/TrainerSignup.css";
import { FcGoogle } from "react-icons/fc";
import "../../assets/styles/trainers/TrainerSignup.css";
import { useNavigate } from "react-router-dom";

function TrainerSignup() {
    const navigate = useNavigate()
  return (
    <>
      <div className="trainer-signup-container">
        <div className="trainer-signup-div">
          <div className="trainer-signup-icon">
            <img src="/Trainer-signup.jpg" alt="" />{" "}
            <p onClick={()=>navigate("/trainer-login")}>Already have an account ?</p>
          </div>
          <div className="trainer-signup-form">
            <h1>Sign up</h1>
            <input
              type="text"
              className="trainer-signup-input"
              placeholder="Full name"
            />
            <hr />

            <input
              type="text"
              className="trainer-signup-input"
              placeholder="Email"
            />
            <hr />
            <input
              type="password"
              className="trainer-signup-input"
              placeholder="Password"
            />
            <hr />
            <input
              type="password"
              className="trainer-signup-input"
              placeholder="Confirm password"
            />

            <hr />
            <button className="trainer-signup-button">
              Sign Up 
            </button>

            <div className="or-signup">
              <p>Or sign up with </p>{" "}
              <FcGoogle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainerSignup;
