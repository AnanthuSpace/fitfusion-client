import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../redux/admin/adminSlice";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin");
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark border-bottom border-secondary">
        <div className="container-fluid">
          <span className="navbar-brand text-white fw-bold">FITFUSION</span>
          <a
            className="text-white ms-auto text-decoration-none"
            onClick={handleShow}
            style={{ cursor: "pointer" }}
          >
            Logout
          </a>
        </div>
      </nav>

      {/* Logout Modal */}
      <Modal show={showModal} centered contentClassName="p-0">
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
            onClick={handleClose}
            style={{ width: "30%", border: "none" }}
            className="gradient-blue-white ms-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="gradient-red-white me-1"
            onClick={handleLogout}
            style={{ width: "30%" }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
