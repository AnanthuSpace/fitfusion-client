import React, { useState } from "react";
import "../../assets/styles/users/PasswordModal.css"; // 

function PasswordModal({ onClose, onSubmit }) {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(password);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter Password</h2>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
