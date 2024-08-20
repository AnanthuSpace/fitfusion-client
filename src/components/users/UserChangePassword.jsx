import React, { useState } from "react";
import "../../assets/styles/users/UserChangePassword.css";
import { useDispatch } from "react-redux";
import { changeUserPassword } from "../../redux/users/userThunk";

function UserChangePassword({ onClose }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const dispatch = useDispatch();

  const handleChangePass = () => {
    dispatch(
      changeUserPassword({
        oldPass,
        newPass,
      })
    );
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <input
          type="password"
          className="userrepass"
          placeholder="Old Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />
        <input
          type="password"
          className="userrepass"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <button className="userchangepass-btn" onClick={handleChangePass}>
          Change
        </button>
        <button className="close-modal-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UserChangePassword;
