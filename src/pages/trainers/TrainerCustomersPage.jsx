import React from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import Customers from "../../components/trainers/Customers";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerConsole.css";

function TrainerCustomersPage() {
  return (
    <>
      <div className="d-flex vh-100 trainer-gradient-bg">
        <TrainerSideBar />
        <div className="flex-grow-1 d-flex flex-column ">
          <TrainerNavbar />
          <Customers />
        </div>
      </div>
    </>
  );
}

export default TrainerCustomersPage;
