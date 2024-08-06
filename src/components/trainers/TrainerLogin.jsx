import React, { useState } from "react";
import "../../assets/styles/trainers/TrainerLogin.css";
import { HiMiniUser } from "react-icons/hi2";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trainerLogin } from "../../redux/trainers/trainerThunk";

function TrainerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.trainer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const emailId = email.toLowerCase();
    dispatch(trainerLogin({ email: emailId, password }))
    .then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/trainer-console");
      }
    });
  };

  return (
    <>
      <div className="trainer-login-container">
        <div className="trainer-login-div">
          <div className="trainer-login-icon">
            <img src="/Login-image.png" alt="Login" />
            <u>
              <p onClick={() => navigate("/trainer-signup")}>Create an account</p>
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

            {error && <p className="error-message">{error}</p>}

            <div className="or-login">
              <u>
                <p>Or login with</p>
              </u>
              <FcGoogle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainerLogin;
