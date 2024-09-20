import { useNavigate } from "react-router-dom";
import "../../assets/styles/users/LoginPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/users/userThunk";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const emailId = email.toLowerCase();
    dispatch(userLogin({ email: emailId }))
    .unwrap()
    .then((response) => {      
        if (response) {
          navigate("/login-verify");
        }
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { hideProgressBar: true, autoClose: 3000 });
    }
  }, [error]);

  return (
    <>
        <div className="login-page background-gradient-main">
          <div className="login-nav-bar">
            <div className="login-logo">
              <h1 className="gradient-text">FitFusion</h1>
            </div>
            <div className="login-nav-list">
              <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="login-btns">
              <div className="login-signin-btn" onClick={() => navigate("/login")}>
                Sign in
              </div>
              <div className="login-signup-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </div>
            </div>
          </div>

          <div className="login-body-container">
            <div className="login-heading">
              <span className="gradient-text">
                Let’s build <br /> the physical you
              </span>
              <h2>Perfect Fitness App</h2>
              <p>
                Why sir end believe uncivil respect. Always get <br />
                adieus nature day course for common. My little <br />
                garret repair to desire he esteem.
              </p>
              <div className="login-last">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="email"
                    className="emailid"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  {!isLoading ? (
                    <button className="login-user" onClick={handleSubmit}>
                      Get Started
                    </button>
                  ) : (
                    <button className="login-user">Loading...</button>
                  )}
                </div>
                <button className="login-trainer" onClick={()=> navigate("/trainer")}>Login as a Trainer</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Login;
