import React from "react";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerTransactionHistroy from "../../components/trainers/TrainerTransactionHistroy";

const TrainerHistoryPage = () => {
  return (
    <>
      <div className="d-flex vh-100 trainer-gradient-bg">
        <TrainerSideBar />
        <div className="flex-grow-1 d-flex flex-column">
          <TrainerNavbar />
          <TrainerTransactionHistroy />
        </div>
      </div>
    </>
  );
};

export default TrainerHistoryPage;
