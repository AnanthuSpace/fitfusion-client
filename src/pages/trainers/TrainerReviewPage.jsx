import React from 'react'
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import ReviewComponent from '../../components/trainers/ReviewComponent';

const TrainerReviewPage = () => {
    return (
        <>
          <div className="d-flex vh-100 trainer-gradient-bg">
            <TrainerSideBar />
            <div className="flex-grow-1 d-flex flex-column">
              <TrainerNavbar />
              <ReviewComponent/>
            </div>
          </div>
        </>
      );
}

export default TrainerReviewPage