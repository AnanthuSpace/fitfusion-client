import React from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerConsole.css";
// import TrainerDashobord from "../../components/trainers/TrainerDashobord";

function TrainerDashboardPage() {
  return (
    <>
      <div className="d-flex vh-100">
        <TrainerSideBar />
        <div className="flex-grow-1 d-flex flex-column trainer-gradient-bg">
          <TrainerNavbar />
          <div className="glass-effect mt-3 mb-3 h-100">
            {/* <TrainerDashobord /> */}
            <h3>Dashboard</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainerDashboardPage;
