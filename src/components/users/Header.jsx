import "../../assets/styles/Header.css";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="nav-bar">
        <div className="header-logo">
          <h1>FitFusion</h1>
        </div>
        <div className="header-nav-list">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === "/class" ? "active" : ""}>
              <Link to="/class">Class</Link>
            </li>
            <li className={location.pathname === "/trainers" ? "active" : ""}>
              <Link to="/trainers">Trainers</Link>
            </li>
            <li className={location.pathname === "/contact" ? "active" : ""}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="signinButtn">
          <button onClick={handleSignIn}>Sign in</button>
        </div>
      </div>
    </>
  );
}

export default Header;
