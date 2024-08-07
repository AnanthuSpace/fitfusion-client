import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TrainerNavbar from "./TrainerNavbar";
import TrainerSideBar from "./TrainerSideBar";
import TrainerProfileComponent from "./TrainerProfileComponent";
import "../../assets/styles/trainers/TrainerConsole.css"

function TrainerConsole() {
  return (
    <>
      <div className="row">
        <div className="col-2 p-0 bg-dark">
          <TrainerSideBar />
        </div>
        <div className="col-10 p-0 bg-dark">
          <TrainerNavbar />
          <img  className="col-12 p-0 mt-0 bakcgroundimage" src="/background-cover.jpg" alt="" />
          <TrainerProfileComponent />
        </div>
      </div>
    </>
  );
}

export default TrainerConsole;
