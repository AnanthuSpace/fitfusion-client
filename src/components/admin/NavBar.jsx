import React from "react";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark border-bottom border-secondary">
      <div className="container-fluid">
        <span className="navbar-brand text-white fw-bold">FITFUSION</span>
        <a href="/logout" className="text-white ms-auto text-decoration-none">Logout</a>
      </div>
    </nav>
  );
}

export default NavBar;
