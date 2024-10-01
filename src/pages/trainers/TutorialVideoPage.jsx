import React from "react";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import Videos from "../../components/trainers/Videos";

const TutorialVideoPage = () => {
  return (
    <>
      <div className="d-flex trainer-gradient-bg h-100">
        <TrainerSideBar />
        <div className="flex-grow-1 d-flex flex-column">
          <TrainerNavbar />
          <div className="d-flex justify-content-center align-items-center flex-grow-1 m-3">
            <Videos />
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialVideoPage;
