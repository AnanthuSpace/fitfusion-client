import React from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import Customers from "../../components/trainers/Customers";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerConsole.css";
import Reveal from "../../components/common/animationConfig";

function TrainerCustomersPage() {
  return (
    <>
      <div className="d-flex vh-100 trainer-gradient-bg">
        <TrainerSideBar />
        <div className="flex-grow-1 d-flex flex-column ">
          <TrainerNavbar />
          <Reveal>
            <Customers />
          </Reveal>
        </div>
      </div>
    </>
  );
}

export default TrainerCustomersPage;
