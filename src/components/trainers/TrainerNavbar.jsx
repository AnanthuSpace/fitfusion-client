import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { trainerLogout } from "../../redux/trainers/trainerSlice";
import { IoMdLogOut } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import VideoUploadModal from "./VideoUploadModal";
import { Modal, Button } from "react-bootstrap";
import { uploadVideo } from "../../redux/trainers/trainerThunk";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerNavbar.css";

function TrainerNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleLogout = () => {
    dispatch(trainerLogout());
    navigate("/trainer");
  };

  const handleUploadVideos = () => setShowVideoModal(true);

  const handleVideoUploadClose = () => setShowVideoModal(false);
  const handleLogoutClose = () => setShowLogoutModal(false);

  const handleVideoUpload = (e) => {
    e.preventDefault();
    dispatch(uploadVideo(videoData)).then((res) => {
      console.log(res.payload);
      handleVideoUploadClose();
    });
  };

  const handleChange = (e) => {
    setVideoData({
      ...videoData,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark border-bottom border-secondary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <span className="navbar-brand text-white fw-bold">FITFUSION</span>
          <div className="d-flex align-items-center">
            <MdVideoCall
              className="fs-4 text-white me-3"
              onClick={handleUploadVideos}
              style={{ cursor: "pointer" }}
            />
            <IoMdLogOut
              className="fs-4 text-white"
              onClick={() => setShowLogoutModal(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </nav>

      {/* Video Upload Modal */}
      <VideoUploadModal
        show={showVideoModal}
        handleClose={handleVideoUploadClose}
        videoData={videoData}
        handleChange={handleChange}
        handleVideoUpload={handleVideoUpload}
      />

      {/* Logout Modal */}
      <Modal
        show={showLogoutModal}
        centered
        contentClassName="p-0"
        backdrop="static"
      >
        <Modal.Header
          style={{ backgroundColor: "black", borderBottom: "none" }}
        >
          <Modal.Title className="w-100 text-center text-white">
            Confirm Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "black",
            borderTop: "none",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="secondary"
            onClick={handleLogoutClose}
            style={{ width: "30%", border: "none" }}
            className="gradient-red-white"
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleLogout}
            style={{ width: "30%", border: "none" }}
            className="gradient-blue-white"
          >
            <IoMdLogOut className="fs-4 text-white" />
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TrainerNavbar;
