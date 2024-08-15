import React from "react";
import BootstrapHeader from "../../components/users/BootstrapHeader";
import TriainersList from "../../components/users/TriainersList";

function TrainerListPage() {
  return (
    <div className="position-fixed top-0 w-100 bg-dark h-100">
      <BootstrapHeader />
      <TriainersList />
    </div>
  );
}

export default TrainerListPage;