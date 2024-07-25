// import { useState } from 'react';
import '../../assets/Header.css'

function Header() {
    // const [page, setPage] = useState('')

  return (
    <>
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
            <div className="signin-btn">Sign in</div>
            <div className="signup-btn">Sign Up</div>
        </div>
      </div>
    </>
  );
}

export default Header;
