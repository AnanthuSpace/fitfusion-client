import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { transactionnHistory } from "../../redux/users/userThunk";
import { Modal } from "react-bootstrap";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const handleUnsubcribe = (transactionId) => {
    setShowModal(true);
    console.log(transactionId);
  };

  const handleClose = (transactionId) => {
    setShowModal(false);
    console.log(transactionId);
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
                    <td>{transaction?.trainerName}</td>
                    <td>${transaction?.amount.toFixed(2)}</td>
                    <td className="text-success">Completed</td>
                    <td>
                      <button
                        className="gradient-red-white"
                        onClick={() => handleUnsubcribe(transaction._id)}
                      >
                        unsubscribe
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
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

      <Modal show={showModal} centered contentClassName="p-0">
        <Modal.Header
          style={{ backgroundColor: "black", borderBottom: "none" }}
        >
          <Modal.Title className="w-100 text-center text-white">
            Confirmation of UnSubscription
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          <h5>Warning: Unsubscription Terms</h5>
          <p>Are you sure you want to unsubscribe from the trainer?</p>
          <p>
            Please note: If you unsubscribe, the amount will be deducted based
            on the number of days you have used the subscription:
          </p>
          <ul>
            <li>
              Unsubscribing within 10 days will result in a 25% deduction.
            </li>
            <li>
              Unsubscribing after 10 days but within 15 days will result in a
              50% deduction.
            </li>
          </ul>
          <p>
            The deduction will be calculated based on the remaining days of your
            subscription.
          </p>
          <p style={{ color: "yellow" }}>
            Please confirm if you want to proceed.
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
            // onClick={}
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
