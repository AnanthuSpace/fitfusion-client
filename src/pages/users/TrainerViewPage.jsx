import React from "react";
import TrainerProfileView from "../../components/users/TrainerProfileView";
import BootstrapHeader from "../../components/users/BootstrapHeader";

function TrainerViewPage() {
  return (
    <>
      <div className=" top-0 w-100 h-100 background-gradient-main overflow-hidden">
        <BootstrapHeader />
        <TrainerProfileView />
      </div>
    </>
  );
}

export default TrainerViewPage;
