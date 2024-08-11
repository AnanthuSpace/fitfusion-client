import React, { useState } from "react";
import "../../assets/styles/trainers/TrainerProfileComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { editTrainer } from "../../redux/trainers/trainerThunk";

function TrainerProfileComponent() {
  const trainer = useSelector((state) => state.trainer.trainerData);
  const dispatch = useDispatch();


  const [name, setName] = useState(trainer?.name || "");
  const [gender, setGender] = useState(trainer?.gender || "");
  const [phone, setPhone] = useState(trainer?.phone || "");
  const [address, setAddress] = useState(trainer?.address || "");
  const [qualification, setQualification] = useState(
    trainer?.qualification || ""
  );
  const [achivements, setAchivements] = useState(trainer?.achivements || "");

  const handleUpdate = () => {
    dispatch(
      editTrainer({
        name: name,
        gender: gender,
        phone: phone,
        address: address,
        qualification: qualification,
        achivements: achivements,
      })
    );
  };

  return (
    <div className="mt-5 d-flex justify-content-center trainerprofilecontainer">
      <div className="mt-3 trainer-profile-container col-3 me-4 d-flex flex-column justify-content-center align-items-center">
        <img
          src="/Trainer-profile.jpg"
          alt="Profile"
          className="trainer-profile-img col-6 p-0"
        />
        <b>
          <p className="pt-4">{name}</p>
        </b>
        <b>
          <p className="pt-2">{address}</p>
        </b>
        <b>
          <p className="pt-2">Level: {trainer?.level}</p>
        </b>
      </div>
      <div className="mt-3 trainer-profile-container col-8 d-flex align-items-center">
        <div className="col-6 my-5">
          <label htmlFor="name" className="form-label mt-4">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name} 
            placeholder="Enter full name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="gender" className="form-label mt-4">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            className="form-control"
            value={gender} 
            placeholder="Enter gender"
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="qualification" className="form-label mt-4">
            Qualification
          </label>
          <input
            type="text"
            id="qualification"
            className="form-control"
            value={qualification} 
            placeholder="Enter qualification"
            onChange={(e) => setQualification(e.target.value)}
          />
          <button className="mt-5 trainer-profile-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
        <div className="col-6 my-5">
          <label htmlFor="phone" className="form-label mt-4">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="form-control"
            value={phone} 
            placeholder="Enter phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="address" className="form-label mt-4">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={address}
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="achivements" className="form-label mt-4">
            Achievements
          </label>
          <input
            type="text"
            id="achivements"
            className="form-control"
            value={achivements} 
            placeholder="Enter achievements"
            onChange={(e) => setAchivements(e.target.value)}
          />
          <button className="mt-5 trainer-profile-btn">Reset Password</button>
        </div>
      </div>
    </div>
  );
}

export default TrainerProfileComponent;
