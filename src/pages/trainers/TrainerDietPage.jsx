import React from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import DietPlan from "../../components/trainers/DietPlan";

const TrainerDietPage = () => {
  return (
    <div className="d-flex trainer-gradient-bg vh-100">
      <TrainerSideBar />
      <div className="flex-grow-1 d-flex flex-column">
        <TrainerNavbar />
        <DietPlan />
      </div>
    </div>
  );
};

export default TrainerDietPage;
