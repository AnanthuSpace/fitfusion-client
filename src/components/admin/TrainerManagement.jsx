import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  handleBlockTrainer,
  handleUnblockTrainer,
  verifyTrainer,
  fetchTrainers,
} from "../../redux/admin/adminThunk";


const TrainerManagement = () => {
  const dispatch = useDispatch();
  const [trainersData, setTrainersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadTrainers(1);
  }, []);


  const loadTrainers = async (page) => {
    dispatch(fetchTrainers(page)).then((res) => {
      setTrainersData(res.payload);
      setCurrentPage(page);
    });
  };

  const handleVerify = (trainerId, isVerified) => {
    dispatch(verifyTrainer({ trainerId, isVerified }));
  };

  const handleToggleBlock = (trainer) => {
    if (trainer.isBlocked) {
      dispatch(handleUnblockTrainer({ trainerId: trainer.trainerId }));
    } else {
      dispatch(handleBlockTrainer({ trainerId: trainer.trainerId }));
    }
  };

  const handleEdit = (id) => {
    console.log("Edit trainer with id:", id);
  };

  const handlePageChange = (newPage) => {
    loadTrainers(newPage);
  };

  return (
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
            <th scope="col">Level</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
            <th scope="col">Edit</th>
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
              <td>{trainer.level || "Not mentioned"}</td>
              <td>
                {trainer.verified === "pending" ? (
                  <>
                    <FaCheck
                      className="text-success me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleVerify(trainer.trainerId, "verified")
                      }
                    />
                    <FaTimes
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleVerify(trainer.trainerId, "rejected")
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
                <FaEdit
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(trainer.trainerId)}
                />
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
    </div>
  );
};

export default TrainerManagement;
