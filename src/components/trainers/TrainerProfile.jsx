import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editTrainer,
  changeTrainerPassword,
  updateProfilePicture,
  fetchTrainerProfile,
} from "../../redux/trainers/trainerThunk";
import { FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerProfile.css";

function TrainerProfile() {
  const trainer = useSelector((state) => state.trainer.trainerData);
  const dispatch = useDispatch();

  const [name, setName] = useState(trainer?.name || "");
  const [gender, setGender] = useState(trainer?.gender || "");
  const [phone, setPhone] = useState(trainer?.phone || "");
  const [address, setAddress] = useState(trainer?.address || "");
  const [qualification, setQualification] = useState(
    trainer?.qualification || ""
  );
  const [achivements, setAchievements] = useState(trainer?.achivements || "");
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState(trainer?.achivements || "");
  const [feePerMonth, setFeePerMonth] = useState(trainer?.feePerMonth || "");
  const [experience, setExperience] = useState(trainer?.experience || "");
  const [profileIMG, setProfileImage] = useState(
    trainer?.profileIMG || "/Trainer-profile.jpg"
  );

  useEffect(() => {
    dispatch(fetchTrainerProfile())
  }, []);

  const handleUpdate = () => {
    dispatch(
      editTrainer({
        name,
        gender,
        phone,
        address,
        qualification,
        achivements,
        feePerMonth,
        experience,
      })
    );
  };

  const handleResetPassword = () => {
    dispatch(
      changeTrainerPassword({ oldPass: oldPassword, newPass: newPassword })
    );
    setOldPassword("");
    setNewPassword("");
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      dispatch(updateProfilePicture(file)).then((res) =>
        setProfileImage(res.payload)
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-center glass-effect text-white">
            <div className="position-relative">
              <img
                src={`${trainer?.profileIMG}`}
                className="card-img-top mx-auto mt-4"
                alt="profileIMG"
                style={{ width: "130px", height: "130px", borderRadius: "50%" }}
              />
              <label htmlFor="profileImageUpload" className="edit-icon">
                <FaEdit size={24} color="white" />
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImageUpload"
                onChange={handleImageChange}
                className="d-none"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text text-muted">
                {trainer?.role || "Fitness Trainer"}
              </p>
              <p className="card-text">Address: {address}</p>
              <p className="card-text">Level: {trainer?.level || "Advanced"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card glass-effect text-white">
            <div className="card-body">
              <h5 className="card-title">Profile Information</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="gender"
                      placeholder="Enter gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="qualification">Qualification</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="qualification"
                      placeholder="Enter Qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="experience">Experience in year</label>
                    <input
                      className="form-control bg-transparent text-white"
                      id="experience"
                      value={experience}
                      placeholder="Enter Experience"
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="phone"
                      value={phone}
                      placeholder="Enter Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="address"
                      value={address}
                      placeholder="Enter Address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="achievements">Achievements</label>
                    <input
                      className="form-control bg-transparent text-white"
                      id="achivements"
                      value={achivements}
                      placeholder="Enter Achievements"
                      onChange={(e) => setAchievements(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="achievements">Fees Per Month</label>
                    <input
                      className="form-control bg-transparent text-white"
                      id="achivements"
                      value={feePerMonth}
                      placeholder="$"
                      onChange={(e) => setFeePerMonth(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="btn gradient-blue-white text-white mt-4"
                  onClick={handleUpdate}
                >
                  Save Profile
                </button>
                <button
                  className="btn gradient-blue-white text-white mt-4"
                  onClick={() => setShowModal(true)}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5 className="text-center text-white mb-4">Reset Password</h5>
            <div className="form-group">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                className="form-control bg-black text-white"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                className="form-control bg-black text-white"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn gradient-blue-white text-white"
                onClick={handleResetPassword}
              >
                Submit
              </button>
              <button
                className="btn btn-black text-white"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerProfile;
