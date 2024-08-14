import React from "react";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerChat from "../../components/trainers/TrainerChat";

function TrainerChatPage() {
  return (
    <div className="d-flex vh-100 overflow-hidden flex-column">
      <TrainerNavbar />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <TrainerSideBar />
        <TrainerChat />
      </div>
    </div>
  );
}

export default TrainerChatPage;
