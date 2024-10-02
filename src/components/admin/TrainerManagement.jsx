import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  handleBlockTrainer,
  handleUnblockTrainer,
  verifyTrainer,
  fetchTrainers,
  fetchIndividualTrainer,
} from "../../redux/admin/adminThunk";
import { Modal, Button } from "react-bootstrap";
import TrainerDetailsModal from "./TrainerDetailsModal";
import RejectionModal from "./RejectionModal";

const TrainerManagement = () => {
  const dispatch = useDispatch();
  const [trainersData, setTrainersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [individualData, setIndividualData] = useState(null);
  const [showRejectionReason, setShowRejectionReason] = useState(false);

  useEffect(() => {
    loadTrainers(1);
  }, [dispatch]);

  const loadTrainers = async (page) => {
    dispatch(fetchTrainers(page)).then((res) => {
      setTrainersData(res.payload);
      setCurrentPage(page);
    });
  };

  const handleVerify = (trainerId, isVerified) => {
    if (isVerified === "rejected") {
      setSelectedTrainer(trainerId);
      setShowRejectionReason(true);
    } else {
      dispatch(verifyTrainer({ trainerId, isVerified }));
    }
  };

  const handleToggleBlock = (trainer) => {
    setSelectedTrainer(trainer);
    setShowModal(true);
  };

  const confirmToggleBlock = () => {
    const action = selectedTrainer.isBlocked
      ? handleUnblockTrainer
      : handleBlockTrainer;

    dispatch(action({ trainerId: selectedTrainer.trainerId })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const updatedTrainers = trainersData.map((t) =>
          t.trainerId === selectedTrainer.trainerId
            ? { ...t, isBlocked: !t.isBlocked }
            : t
        );
        setTrainersData(updatedTrainers);
      }
      setShowModal(false);
    });
  };

  const handlePageChange = (newPage) => {
    loadTrainers(newPage);
  };

  const handleView = (trainer) => {
    dispatch(fetchIndividualTrainer(trainer.trainerId)).then((res) => {
      setIndividualData(res.payload);
      setShowDetailsModal(true);
    });
  };

  return (
    <>
      <div
        className="container-fluid p-3 flex-column"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <h2 className="short-gradient-text-blue">Trainer Management</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search trainers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              color: "white",
              backgroundColor: "black",
              borderColor: "white",
              borderRadius: "4px",
              padding: "8px",
            }}
          />
          <style>
            {`
              .form-control::placeholder {
                color: white;
              }
            `}
          </style>
        </div>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Phone</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {trainersData.map((trainer, index) => (
              <tr key={trainer.trainerId}>
                <th scope="row">{(currentPage - 1) * 5 + index + 1}</th>
                <td>{trainer.name}</td>
                <td>{trainer.email}</td>
                <td>{trainer.gender || "Not mentioned"}</td>
                <td>{trainer.phone || "Not mentioned"}</td>
                <td>
                  {trainer.verified === "pending" ? (
                    <>
                      <FaCheck
                        className="text-success me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleVerify(trainer.email, "verified")
                        }
                      />
                      <FaTimes
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleVerify(trainer.email, "rejected")
                        }
                      />
                    </>
                  ) : trainer.verified === "verified" ? (
                    <span className="badge bg-success">Verified</span>
                  ) : (
                    <span className="badge bg-danger">Rejected</span>
                  )}
                </td>
                <td>
                  <button
                    className={`btn ${
                      trainer.isBlocked
                        ? "gradient-red-white"
                        : "gradient-blue-white"
                    }`}
                    style={{ width: "100px", color: "white" }}
                    onClick={() => handleToggleBlock(trainer)}
                  >
                    {trainer.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
                <td>
                  <Button
                    className="gradient-blue-white"
                    onClick={() => handleView(trainer)}
                    style={{ color: "white" }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          {trainersData.length < 5 ? (
            <button className="btn btn-secondary">End</button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          )}
        </div>

        <Modal show={showModal} centered contentClassName="p-0">
          <Modal.Header
            style={{ backgroundColor: "black", borderBottom: "none" }}
          >
            <Modal.Title className="w-100 text-center text-white">
              Confirm Action
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
            {selectedTrainer && selectedTrainer.isBlocked
              ? "Are you sure you want to unblock this trainer?"
              : "Are you sure you want to block this trainer?"}
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
              onClick={() => setShowModal(false)}
              style={{ width: "30%", border: "none" }}
              className="gradient-blue-white ms-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="gradient-red-white me-1"
              onClick={confirmToggleBlock}
              style={{ width: "30%" }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <TrainerDetailsModal
          show={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          trainer={individualData}
        />
        <RejectionModal
          show={showRejectionReason}
          onClose={() => setShowRejectionReason(false)}
          trainerId={selectedTrainer}
        />
      </div>
    </>
  );
};

export default TrainerManagement;
