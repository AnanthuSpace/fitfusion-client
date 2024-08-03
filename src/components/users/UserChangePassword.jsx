import React, { useState } from "react";
import "../../assets/styles/users/UserChangePassword.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserPassword } from "../../redux/users/userThunk";

function UserChangePassword({ isRePass, setIsRePass }) {
  // () => setIsRePass(false)
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePass = () => {
    dispatch(
      changeUserPassword({
        oldPass,
        newPass,
      })
    );
  };

  return (
    <>
      <div className="user-change-pass-container">
        <input
          type="password"
          className="userrepass"
          placeholder="Old Password"
          onChange={(e) => setOldPass(e.target.value)}
        />
        <input
          type="password"
          className="userrepass"
          placeholder="New Password"
          onChange={(e) => setNewPass(e.target.value)}
        />
        <button className="userchangepass-btn" onClick={handleChangePass}>
          Change
        </button>
      </div>
    </>
  );
}

export default UserChangePassword;
