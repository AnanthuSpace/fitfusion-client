import React from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerConsole.css";
import TrainerProfile from "../../components/trainers/TrainerProfile";
import Reveal from "../../components/common/animationConfig";

function TrainerProfilePage() {
  return (
    <>
      <div className="d-flex vh-100 trainer-gradient-bg">
        <TrainerSideBar />
        <div className="flex-grow-1 d-flex flex-column">
          <TrainerNavbar />
          <Reveal>
            <TrainerProfile />
          </Reveal>
        </div>
      </div>
    </>
  );
}

export default TrainerProfilePage;
