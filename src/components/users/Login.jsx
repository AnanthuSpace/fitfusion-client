import { useNavigate } from "react-router-dom";
import "../../assets/styles/LoginPage.css";

function Login() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="login-page">
        <div className="nav-bar">
          <div className="logo">
            <h1>FitFusion</h1>
          </div>
          <div className="nav-list">
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="btns">
            <div className="signin-btn" onClick={() => navigate("/login")}>Sign in</div>
            <div className="signup-btn" onClick={() => navigate("/signup")}>Sign Up</div>
          </div>
        </div>

        <div className="body-container">
          <div className="heading">
            <span>
              Let’s build <br /> the physical you
            </span>
            <h2>Perfect Fitness App</h2>
            <p>
              Why sir end believe uncivil respect. Always get <br />
              adieus nature day course for common. My little <br />
              garret repair to desire he esteem.
            </p>
            <div className="last">
              <div className="input">
                <input type="text" placeholder="email" className="emailid" />
                <button className="user" onClick={()=> navigate('/verify-otp')}>Get Started</button>
              </div>
              <button className="trainer">Login as a Trainer</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;