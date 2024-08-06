import React, { useState } from "react";
import "../../assets/styles/users/Profile.css";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { editUserData } from "../../redux/users/userThunk";
import { useNavigate } from "react-router-dom";
import UserChangePassword from "./UserChangePassword";
import PasswordModal from "./PasswordModal";

function UserProfile() {
  const userData = useSelector((state) => state.user.userData);
  const [name, setName] = useState(userData.name);
  const [phone, setPhone] = useState(userData.phone || "");
  const [address, setAddress] = useState(userData.address || "");
  const [gender, setGender] = useState(userData.gender || "Male");
  const [isEditing, setIsEditing] = useState(false);
  const [isRePass, setIsRePass] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);

  const handleSave = () => {
    setIsPasswordModalOpen(true); 
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handlePasswordSubmit = (password) => {
    
    dispatch(
      editUserData({
        password,
        name,
        phone,
        address,
        gender,
      })
    ).then((res) => {
      if (res.payload === "Invalid or expired token") {
        navigate("/login");
      }
    });
    setIsEditing(false);
    setIsPasswordModalOpen(false); 
  };

  return (
    <>
      <div className="profile-page">
        <Header />
        <div className="profile-content">
          <div className="profile-div">
            <img src="/profile-icon.jpg" alt="" />
            <h2>{userData.name}</h2>
            {address ? <p>{address}</p> : <p></p>}
            <button className="change-password" onClick={() => setIsRePass(!isRePass)}>Change Password</button>
          </div>
          <div className="user-edit-profile">
            <div className="input-div">
              Full Name
              {isEditing ? (
                <input
                  className="user-input-text"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              ) : (
                <div className="ptag">
                  <p>{name}</p>
                </div>
              )}
            </div>
            <div className="input-div">
              Phone
              {isEditing ? (
                <input
                  className="user-input-text"
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                />
              ) : (
                <div className="ptag">
                  <p>{phone ? phone : "Enter phone number"}</p>
                </div>
              )}
            </div>
            <div className="input-div">
              Address
              {isEditing ? (
                <input
                  className="user-input-text"
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Enter address"
                />
              ) : (
                <div className="ptag">
                  <p>{address ? address : "Enter address"}</p>
                </div>
              )}
            </div>
            <div className="radio-input-div">
              Gender
              {isEditing ? (
                <div className="radio-group">
                  <label>
                    <input
                      className="radio"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={handleGenderChange}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      className="radio"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={handleGenderChange}
                    />
                    Female
                  </label>
                  <label>
                    <input
                      className="radio"
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={gender === "Other"}
                      onChange={handleGenderChange}
                    />
                    Other
                  </label>
                </div>
              ) : (
                <div className="ptag">
                  <p>{gender}</p>
                </div>
              )}
            </div>
            {!isEditing ? (
              <button className="edit-profile-btn" onClick={handleEdit}>
                Edit Profile
              </button>
            ) : (
              <button className="edit-profile-btn" onClick={handleSave}>
                Save
              </button>
            )}
          </div>
        </div>
        {isRePass && <UserChangePassword setIsRePass={setIsRePass} />}
      </div>
      {isPasswordModalOpen && (
        <PasswordModal
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </>
  );
}

export default UserProfile;
