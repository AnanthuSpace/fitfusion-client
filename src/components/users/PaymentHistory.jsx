import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  transactionnHistory,
  unsubscribeTrainer,
} from "../../redux/users/userThunk";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    dispatch(transactionnHistory()).then((res) => setHistory(res.payload.data));
  }, [dispatch]);

  const totalPages = Math.ceil(history.length / limit);
  const paginatedHistory = history.slice((page - 1) * limit, page * limit);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleUnsubscribeModal = (transactionId) => {
    setSelectedTrainerId(transactionId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrainerId(null);
  };

  const handleUnsubscribe = () => {
    if (selectedTrainerId) {
      dispatch(unsubscribeTrainer(selectedTrainerId))
        .then((response) => {
          if (response.payload.success) {
            setHistory((prevHistory) =>
              prevHistory.map((transaction) =>
                transaction._id === selectedTrainerId
                  ? { ...transaction, status: "canceled" }
                  : transaction
              )
            );
            setShowModal(false);
            setSelectedTrainerId(null);
            toast.success("Unsubscription successful!");
          } else {
            toast.error("Unsubscription failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Unsubscription error:", error);
          alert("Something went wrong!");
        });
    }
  };

  const calculateRemainingDays = (expiredAt) => {
    const currentDate = new Date();
    const expirationDate = new Date(expiredAt);
    const timeDiff = expirationDate - currentDate;
    const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return remainingDays;
  };

  const hasExpired = (expiredAt) => {
    return new Date(expiredAt) < new Date();
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div
          className="glass-effect p-3"
          style={{ width: "95%", height: "90%" }}
        >
          <h3 className="text-white m-0 mb-3">Transaction History</h3>
          <Table responsive hover className="table-dark text-white">
            <thead>
              <tr>
                <th>Date</th>
                <th>Expired</th>
                <th>Trainer Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHistory.length > 0 ? (
                paginatedHistory.map((transaction, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(transaction?.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {!hasExpired(transaction?.expiredAt) ? (
                        <span className="text-white">
                          {calculateRemainingDays(transaction?.expiredAt)} days
                          remaining
                        </span>
                      ) : (
                        <p className="error">Expired</p>
                      )}
                    </td>
                    <td>{transaction?.trainerName}</td>
                    <td>${transaction?.amount.toFixed(2)}</td>

                    <td
                      className={
                        transaction?.status === "valid"
                          ? "text-success"
                          : transaction?.status === "canceled"
                          ? "text-danger"
                          : "text-warning"
                      }
                    >
                      {transaction?.status.charAt(0).toUpperCase() +
                        transaction?.status.slice(1)}
                    </td>

                    <td>
                      {!hasExpired(transaction?.expiredAt) && (
                        <button
                          className="gradient-red-white"
                          onClick={() =>
                            handleUnsubscribeModal(transaction._id)
                          }
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Row className="mt-3">
            <Col className="d-flex justify-content-start">
              <Button
                style={{ height: "2rem" }}
                variant="secondary"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Prev
              </Button>
            </Col>
            <Col className="d-flex justify-content-end text-white">
              <Button
                style={{ height: "2rem" }}
                variant="secondary"
                onClick={() => handlePageChange(page + 1)}
                disabled={
                  page === totalPages || paginatedHistory.length < limit
                }
              >
                Next
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} centered contentClassName="p-0">
        <Modal.Header
          style={{ backgroundColor: "black", borderBottom: "none" }}
        >
          <Modal.Title className="w-100 text-center text-white">
            Unsubscription Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          <h5 className="pb-3">Unsubscription and Refund Policy</h5>
          <p>Are you sure you want to unsubscribe from this trainer?</p>
          <p>Your refund will be calculated based on the days used:</p>
          <ul>
            <li className="pb-1">75% refund if within 10 days.</li>
            <li className="pb-1">50% refund if between 10-20 days.</li>
            <li className="pb-1">No refund after 20 days.</li>
          </ul>
          <p>
            The refund will be based on the remaining days of your subscription.
          </p>
          <p style={{ color: "yellow" }}>
            Please confirm if you wish to proceed.
          </p>
        </Modal.Body>

        <Modal.Footer
          style={{
            backgroundColor: "black",
            borderTop: "none",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={handleCloseModal}
            style={{ width: "30%", border: "none" }}
            className="gradient-red-white ms-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="gradient-blue-white me-1"
            onClick={handleUnsubscribe}
            style={{ width: "30%" }}
          >
            Unsubscribe
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentHistory;
