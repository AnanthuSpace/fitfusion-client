import React from "react";
import "../../assets/styles/trainers/TrainerLogin.css";
import { HiMiniUser } from "react-icons/hi2";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";


function TrainerLogin() {
  const navigate = useNavigate()
  return (
    <>
      <div className="trainer-login-container">
        <div className="trainer-login-div">
          <div className="trainer-login-icon">
            <img src="/Login-image.png" alt="" />
            <p  onClick={()=>navigate("/trainer-signup")}>Create an account</p>
          </div>
          <div className="trainner-login-form">
            <h1>Sign in</h1>
            <div className="input-and-icon">
            <HiMiniUser />
              <input type="text" className="trainer-login-input" placeholder="Email"/>
            </div>
            <hr />
            <div className="input-and-icon">
            <RiLockPasswordFill />
              <input type="text" className="trainer-login-input" placeholder=" Password"/>
            </div>
            <hr />
            <button className="trainer-login-button">
              Login
            </button>

            <div className="orlogin">
              <p>Or login with </p>
              <FcGoogle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainerLogin;
