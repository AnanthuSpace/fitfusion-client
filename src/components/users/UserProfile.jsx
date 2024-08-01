import React, { useState } from "react";
import "../../assets/styles/users/Profile.css";
import Header from "./Header";
import { useSelector } from "react-redux";

function UserProfile() {
  const userData = useSelector((state) => state.user.userData);
  const [name, setName] = useState(userData.name);
  const [phone, setPhone] = useState(userData.phone || '');
  const [address, setAddress] = useState(userData.address || '');
  const [gender, setGender] = useState(userData.gender || 'male'); 

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);

  return (
    <>
      <div className="profile-page">
        <Header />
        <div className="profile-content">
          <div className="profile-div">
            <img src="/profile-icon.jpg" alt="" />
            <h2>{userData.name}</h2>
            {address ? <p>{address}</p> : <p></p>}
            <button className="change-password">Change Password</button>
          </div>
          <div className="user-edit-profile">
            <div className="input-div">
              Full Name
              <input
                className="input-text"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="input-div">
              Phone
              <input
                className="input-text"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
              />
            </div>
            <div className="input-div">
              Address
              <input
                className="input-text"
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter address"
              />
            </div>
            <div className="radio-input-div">
              Gender
              <div className="radio-group">
                <label>
                  <input
                    className="radio"
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    className="radio"
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    className="radio"
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === 'other'}
                    onChange={handleGenderChange}
                  />
                  Other
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
