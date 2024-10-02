import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const TrainerDetails = ({ show, onClose, trainer }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!show || !trainer) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        className="bg-black text-white rounded p-4"
        style={{
          width: "80%",
          maxWidth: "800px",
          height: "80%",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          className="position-absolute top-0 end-0 btn btn-link text-white"
          style={{ fontSize: "20px" }}
        >
          &times;
        </button>

        <div className="row mb-3">
          <div className="col-md-4 text-center">
            {!imageLoaded && <div className="skeleton-loader"></div>}
            {trainer.profileIMG && (
              <img
                src={trainer.profileIMG}
                alt={trainer.name}
                className="img-fluid mb-2"
                style={{
                  width: "150px",
                  height: "150px",
                  display: imageLoaded ? "block" : "none",
                }}
                onLoad={() => setImageLoaded(true)}
              />
            )}
            <h2 className="text-start">{trainer.name || "Not Specified"}</h2>
            <br />
            {!trainer.profileIMG && <p>Image Not Specified</p>}
            <div className="text-start">
              <p><strong>Email:</strong> {trainer.email || "Not Specified"}</p>
              <p><strong>Phone:</strong> {trainer.phone || "Not Specified"}</p>
              <p><strong>Gender:</strong> {trainer.gender || "Not Specified"}</p>
              <p><strong>Address:</strong> {trainer.address || "Not Specified"}</p>
            </div>
          </div>

          <div className="col-md-8">
            <div className="p-3">
              <p><strong>Qualification:</strong> {trainer.qualification || "Not Specified"}</p>
              <p><strong>Achievements:</strong> {trainer.achivements || "None"}</p>
              <p><strong>Experience:</strong> {trainer.experience || "Not Specified"} year(s)</p>
              <p><strong>Fee per Month:</strong> {trainer.feePerMonth ? `$${trainer.feePerMonth}` : "Not Specified"}</p>
              <p><strong>Rating:</strong> {trainer.rating || "Not Specified"}</p>
              <p><strong>Already Chatted Users:</strong> {trainer.alreadyChattedUsers ? trainer.alreadyChattedUsers.length : "Not Specified"}</p>
              <p><strong>Status:</strong> {trainer.verified ? "Verified" : "Not Verified"}</p>
              <p><strong>Blocked:</strong> {trainer.isBlocked ? "Yes" : "No"}</p>
              <p><strong>Active:</strong> {trainer.isActive ? "Yes" : "No"}</p>
              <p><strong>Created At:</strong> {trainer.createdAt ? new Date(trainer.createdAt).toLocaleDateString() : "Not Specified"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
