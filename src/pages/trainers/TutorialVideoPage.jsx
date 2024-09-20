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
          <h2 className="text-white ms-4 mt-1">Contents</h2>
          <div className="d-flex justify-content-center align-items-center flex-grow-1">
            <Videos />
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialVideoPage;
