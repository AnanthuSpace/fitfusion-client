import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trainerLogout } from "../../redux/trainers/trainerSlice";
import { IoMdLogOut } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import VideoUploadModal from "./VideoUploadModal";
import { Modal, Button } from "react-bootstrap";
import { toast } from "sonner";
import { uploadVideo } from "../../redux/trainers/trainerThunk";
import { useSocket } from "../../context/SocketContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerNavbar.css";

function TrainerNavbar() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trainerId = useSelector((state) => state.trainer.trainerData.trainerId);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });

  useEffect(() => {
    if (socket) {
      socket.on("incomingCall", (data) => {
        const { callerName, callerId } = data;
        console.log(callerId);
        console.log(trainerId);

        if (callerId === trainerId) {
          toast.info(`Incoming call from ${callerName}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }

    // Clean up the listener on unmount
    return () => {
      if (socket) {
        socket.off("incomingCall");
      }
    };
  }, [socket]);

  useEffect(() => {
    socket.on("isTrainerBlocked", (data) => {
      const { blockedId } = data;
      if (blockedId === trainerId) {
        toast.error(`You are blocked by admin`);
        handleLogout();
      }
    });
  }, []);

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
      setVideoData({ title: "", description: "", category: "", file: null });
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setVideoData({
      ...videoData,
      [name]: files ? files[0] : value,
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
