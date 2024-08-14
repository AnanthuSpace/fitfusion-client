import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTrainer, changeTrainerPassword } from '../../redux/trainers/trainerThunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/styles/trainers/TrainerProfile.css"

function TrainerProfile() {
  const trainer = useSelector((state) => state.trainer.trainerData);
  const dispatch = useDispatch();

  const [name, setName] = useState(trainer?.name || '');
  const [gender, setGender] = useState(trainer?.gender || '');
  const [phone, setPhone] = useState(trainer?.phone || '');
  const [address, setAddress] = useState(trainer?.address || '');
  const [qualification, setQualification] = useState(trainer?.qualification || '');
  const [achivements, setAchievements] = useState(trainer?.achivements || '');
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = () => {
    dispatch(editTrainer({
      name,
      gender,
      phone,
      address,
      qualification,
      achivements,
    }));
  };

  const handleResetPassword = () => {
    dispatch(changeTrainerPassword({ oldPass: oldPassword, newPass: newPassword }));
    setOldPassword('');
    setNewPassword('');
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-center bg-dark text-white">
            <img
              src="/Trainer-profile.jpg"
              className="card-img-top mx-auto mt-4"
              alt="Profile"
              style={{ width: '130px', height: '130px' }}
            />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text text-muted">{trainer?.role || 'Fitness Trainer'}</p>
              <p className="card-text">Address: {address}</p>
              <p className="card-text">Level: {trainer?.level || 'Advanced'}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Profile Information</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="name"
                      value={name}
                      placeholder="Enter full name"
                      onChange={(e) => setName(e.target.value)}
                      style={{ color: '#E1E0E0' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="gender"
                      value={gender}
                      placeholder="Enter gender"
                      onChange={(e) => setGender(e.target.value)}
                      style={{ color: '#E1E0E0' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="qualification" className="form-label">Qualification</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="qualification"
                      value={qualification}
                      placeholder="Enter qualification"
                      onChange={(e) => setQualification(e.target.value)}
                      style={{ color: '#E1E0E0' }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="phone"
                      value={phone}
                      placeholder="Enter phone number"
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ color: '#E1E0E0' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="address"
                      value={address}
                      placeholder="Enter address"
                      onChange={(e) => setAddress(e.target.value)}
                      style={{ color: '#E1E0E0' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="achivements" className="form-label">Achievements</label>
                    <input
                      type="text"
                      className="form-control bg-transparent text-white"
                      id="achievements"
                      value={achivements}
                      placeholder="Enter achievements"
                      onChange={(e) => setAchievements(e.target.value)}
                      style={{ color: '#E1E0E0' }}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn gradient-blue-white text-white mt-4" onClick={handleUpdate}>Update Profile</button>
                <button className="btn gradient-blue-white text-white mt-4" onClick={() => setShowModal(true)}>Reset Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5 className="text-center text-white">Reset Password</h5>
            <div className="modal-body">
              <label htmlFor="oldPassword" className="form-label mt-4">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                className="form-control bg-transparent text-white"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{ color: '#E1E0E0' }}
              />
              <label htmlFor="newPassword" className="form-label mt-4">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="form-control bg-transparent text-white"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ color: '#E1E0E0' }}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-black gradient-red-white " onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-submit btn gradient-blue-white text-white" onClick={handleResetPassword}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerProfile;
