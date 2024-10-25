import React from "react";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import ReviewComponent from "../../components/trainers/ReviewComponent";
import Reveal from "../../components/common/animationConfig";

const TrainerReviewPage = () => {
  return (
    <>
      <div className="d-flex vh-100 trainer-gradient-bg">
        <TrainerSideBar />
        <div className="flex-grow-1 d-flex flex-column">
          <TrainerNavbar />
          <Reveal>
            <ReviewComponent />
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default TrainerReviewPage;
