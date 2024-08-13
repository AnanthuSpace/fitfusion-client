import React from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerConsole.css"
import TrainerProfileComponent from "../../components/trainers/TrainerProfileComponent";

function TrainerProfilePage() {
  return (
    <>
    <div className="d-flex vh-100 bg-black">
      <TrainerSideBar />
      <div className="flex-grow-1 d-flex flex-column">
        <TrainerNavbar />
        <TrainerProfileComponent />
      </div>
    </div>
  </>
  )
}

export default TrainerProfilePage