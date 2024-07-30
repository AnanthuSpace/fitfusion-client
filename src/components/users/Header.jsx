// import { useState } from 'react';
import "../../assets/styles/Header.css";

function Header() {
  // const [page, setPage] = useState('')

  return (
    <>
      <div className="signup-nav-bar">
        <div className="signup-logo">
          <h1>FitFusion</h1>
        </div>
        <div className="signup-nav-list">
          <ul>
            <li>Home</li>
            <li>Class</li>
            <li>Trainers</li>
            <li>Conatct</li>
          </ul>
        </div>
        <div className="signinButtn">
          <button>Sign in</button>
        </div>
      </div>
    </>
  );
}

export default Header;
