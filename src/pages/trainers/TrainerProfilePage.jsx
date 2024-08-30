import React from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerConsole.css"
import TrainerProfile from "../../components/trainers/TrainerProfile";

function TrainerProfilePage() {
  return (
    <>
    <div className="d-flex vh-100 trainer-gradient-bg">
      <TrainerSideBar />
      <div className="flex-grow-1 d-flex flex-column">
        <TrainerNavbar />
        <TrainerProfile />
      </div>
    </div>
  </>
  )
}

export default TrainerProfilePage