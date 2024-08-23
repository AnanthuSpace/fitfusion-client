import React from "react";
import { useParams } from "react-router-dom";
import TrainerProfileView from "../../components/users/TrainerProfileView";
import BootstrapHeader from "../../components/users/BootstrapHeader";

function TrainerViewPage() {
  const { trainerId } = useParams();
  return (
    <>
      <div className="position-fixed top-0 w-100 background-gradient-main h-100">
        <BootstrapHeader />
        <TrainerProfileView trainerId={trainerId}/>
      </div>
    </>
  );
}

export default TrainerViewPage;
