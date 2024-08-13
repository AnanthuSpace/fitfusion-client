import React from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerConsole.css";
import TrainerDashobord from "../../components/trainers/TrainerDashobord";

function TrainerDashboardPage() {
  return (
    <>
      {/* <div className="row">
        <div className="col-2 p-0 bg-dark">
          <TrainerSideBar />
        </div>
        <div className="col-10 p-0 bg-black">
          <TrainerNavbar />
          <TrainerDashobord /> 
        </div>
      </div> */}

      <div className="d-flex vh-100">
        <TrainerSideBar />
        <div className="flex-grow-1 d-flex flex-column">
          <TrainerNavbar />
          <TrainerDashobord />
        </div>
      </div>

    </>
  );
}

export default TrainerDashboardPage;
