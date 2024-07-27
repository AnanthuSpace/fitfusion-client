import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { registration } from "../../redux/users/userThunk";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/Signup.css";

function Signup() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    dispatch(
      registration({
        name,
        email,
        password,
        confirmPass,
        toast,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/verify-otp");
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-page">
        <div className="signup-nav-bar">
          <div className="signup-logo">
            <h1>FitFusion</h1>
          </div>
          <div className="signup-nav-list">
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="signup-btns">
            <div
              className="signup-signin-btn"
              onClick={() => navigate("/login")}
            >
              Sign in
            </div>
            <div
              className="signup-signup-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </div>
          </div>
        </div>

        <div className="signup-body-container">
          <div className="signup-heading">
            <span>
              Let’s build <br /> the physical you
            </span>
            <h2>Perfect Fitness App</h2>
            <p>
              Why sir end believe uncivil respect. Always get <br />
              adieus nature day course for common. My little <br />
              garret repair to desire he esteem.
            </p>
          </div>
          <div className="signupform">
            <h2 style={{ color: "#FF7906" }}>Sign Up</h2>
            <input
              type="text"
              className="input-text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              className="input-text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="input-text"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            {!isLoading ? (
              <button className="join" onClick={handleSubmit}>
                Join
              </button>
            ) : (
              <button className="join" disabled>
                Loading...
              </button>
            )}
            <p>
              By continuing, you agree to accept our <br />
              privacy policy & Terms of Service.
            </p>
            OR
            <button className="google">
              <FcGoogle />
              SIGN UP WITH GOOGLE
            </button>
            <p className="allready" onClick={() => navigate("/login")}>
              Already have an account?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
