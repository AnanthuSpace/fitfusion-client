import React from "react";
import "../../assets/styles/trainers/TrainerProfileComponent.css";

function TrainerProfileComponent() {
  return (
    <div className="d-flex justify-content-center trainerprofilecontainer">
      <div className="mt-3 trainer-profile-container col-3 me-4 d-flex flex-column justify-content-center align-items-center py-5">
        <img src="/Trainer-profile.jpg" alt="Profile" className="trainer-profile-img col-6 p-0" />
        <p className="pt-4">Ananthu</p>
        <p className="pt-2">Address</p>
        <p className="pt-2">Level</p>
      </div>
      <div className="mt-3 trainer-profile-container col-8 d-flex align-items-center">
        <div className="col-6 my-5">
          <label htmlFor="fullname1" className="form-label mt-4 ">Full Name</label>
          <input type="text" id="fullname1" className="form-control" placeholder="Full Name"/>
          <label htmlFor="fullname1" className="form-label mt-4 ">Gender</label>
          <input type="text" id="fullname1" className="form-control" placeholder="Gender"/>
          <button className="mt-5 trainer-profile-btn" >Update</button>
        </div>
        <div className="col-6 my-5">
          <label htmlFor="fullname2" className="form-label mt-4 ">Phone</label>
          <input type="text" id="fullname2" className="form-control" placeholder="Address" />
          <label htmlFor="fullname2" className="form-label mt-4 " >Qualification</label>
          <input type="text" id="fullname2" className="form-control" placeholder="Qualification"/>
         <button className="mt-5 trainer-profile-btn">Reset Password</button>
        </div>
      </div>
    </div>
  );
}

export default TrainerProfileComponent;
