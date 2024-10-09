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
  const [gender, setGender] = useState(userData.gender || "");
  const [weight, setWeight] = useState(userData.weight || "");
  const [height, setHeight] = useState(userData.height || "");
  const [activityLevel, setActivityLevel] = useState(
    userData.activityLevel || ""
  );
  const [dietary, setDietary] = useState(userData.dietary || "");
  const [goals, setGoals] = useState(userData.goals || "");
  const [medicalDetails, setMedicalDetails] = useState(
    userData.medicalDetails || ""
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isRePass, setIsRePass] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        weight,
        height,
        activityLevel,
        dietary,
        goals,
        medicalDetails,
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
    {console.log(userData)}
      <div className="profile-page background-gradient-main">
        <Header />
        <div className="profile-content">
          <div className="profile-div">
            <img src="/profile-icon.jpg" alt="" />
            <h2>{userData?.name}</h2>
            {address ? <p>{address}</p> : <p></p>}
            <button
              className="change-password"
              onClick={() => setIsRePass(!isRePass)}
            >
              Change Password
            </button>
          </div>
          <div className="user-edit-profile">
            {/* Name */}
            <div className="input-div">
              Full Name
              {isEditing ? (
                <input
                  className="user-input-text"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <div className="ptag">
                  <p>{name}</p>
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="input-div">
              Phone
              {isEditing ? (
                <input
                  className="user-input-text"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                />
              ) : (
                <div className="ptag">
                  <p>{phone ? phone : "Enter phone number"}</p>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="input-div">
              Address
              {isEditing ? (
                <input
                  className="user-input-text"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                />
              ) : (
                <div className="ptag">
                  <p>{address ? address : "Enter address"}</p>
                </div>
              )}
            </div>

            {/* Gender */}
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
                      onChange={(e) => setGender(e.target.value)}
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
                      onChange={(e) => setGender(e.target.value)}
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
                      onChange={(e) => setGender(e.target.value)}
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

            {/* Weight */}
            <div className="input-div">
              Weight (kg)
              {isEditing ? (
                <input
                  className="user-input-text"
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                />
              ) : (
                <div className="ptag">
                  <p>{weight ? `${weight} kg` : "Enter weight"}</p>
                </div>
              )}
            </div>

            {/* Height */}
            <div className="input-div">
              Height (cm)
              {isEditing ? (
                <input
                  className="user-input-text"
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height"
                />
              ) : (
                <div className="ptag">
                  <p>{height ? `${height} cm` : "Enter height"}</p>
                </div>
              )}
            </div>

            {/* Activity Level */}
            <div className="input-div">
              Activity Level
              {isEditing ? (
                <select
                  className="user-input-text"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="Sedentary">Sedentary</option>
                  <option value="Light">Light</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Active">Active</option>
                  <option value="Very Active">Very Active</option>
                </select>
              ) : (
                <div className="ptag">
                  <p>{activityLevel}</p>
                </div>
              )}
            </div>

            {/* Dietary Preferences */}
            <div className="input-div">
              Dietary Preferences
              {isEditing ? (
                <select
                  className="user-input-text"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                >
                  <option value="Omnivore">Omnivore</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Pescatarian">Pescatarian</option>
                </select>
              ) : (
                <div className="ptag">
                  <p>{dietary}</p>
                </div>
              )}
            </div>

            {/* Goals */}
            <div className="input-div">
              Goals
              {isEditing ? (
                <select
                  className="user-input-text"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                >
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Toning">Toning</option>
                </select>
              ) : (
                <div className="ptag">
                  <p>{goals}</p>
                </div>
              )}
            </div>

            {/* Medical Details */}
            <div className="input-div">
              Medical Details
              {isEditing ? (
                <textarea
                  className="user-input-text"
                  value={medicalDetails}
                  onChange={(e) => setMedicalDetails(e.target.value)}
                  placeholder="Enter medical details"
                />
              ) : (
                <div className="ptag">
                  <p>
                    {medicalDetails ? medicalDetails : "Enter medical details"}
                  </p>
                </div>
              )}
            </div>

            <div className="edit-button-div">
              {isEditing ? (
                <button className="edit-profile-btn" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="edit-profile-btn" onClick={handleEdit}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
        {isRePass && <UserChangePassword onClose={() => setIsRePass(false)} />}
        {isPasswordModalOpen && (
          <PasswordModal
            onClose={() => setIsPasswordModalOpen(false)}
            onSubmit={handlePasswordSubmit}
          />
        )}
      </div>
    </>
  );
}

export default UserProfile;
