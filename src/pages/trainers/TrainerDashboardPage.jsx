import React from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerConsole.css";
// import MyChart from "../../components/trainers/MyChart";
// import TrainerDashobord from "../../components/trainers/TrainerDashobord";

function TrainerDashboardPage() {
  return (
    <>
      <div className="d-flex vh-100">
        <TrainerSideBar />
        <div className="flex-grow-1 d-flex flex-column trainer-gradient-bg">
          <TrainerNavbar />
            {/* <h4 className="text-white m-3">Hi, Welcome back</h4>
            <div className="w-100 d-flex justify-content-center align-items-center p-4">
              <MyChart />
            </div> */}
            {/* <div className="w-100 d-flex justify-content-between align-items-center">
              <MyChart />
              <MyChart />
            </div> */}
          </div>
        </div>
    </>
  );
}

export default TrainerDashboardPage;
