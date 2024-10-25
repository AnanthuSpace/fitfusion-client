import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { transactionnHistory } from "../../redux/users/userThunk";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    dispatch(transactionnHistory()).then((res) =>
      setHistory(res.payload.data.transactionHistory)
    );
  }, [dispatch]);

  const totalPages = Math.ceil(history.length / limit);
  const paginatedHistory = history.slice((page - 1) * limit, page * limit);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <div className="glass-effect p-3" style={{ width: "95%", height: "90%" }}>
        <h3 className="text-white m-0 mb-3">Transaction History</h3>
        <Table responsive bordered hover className="table-dark text-white">
          <thead>
            <tr>
              <th>Date</th>
              <th>Trainer Name</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedHistory.length > 0 ? (
              paginatedHistory.map((transaction, index) => (
                <tr key={index}>
                  <td>{new Date(transaction?.createdAt).toLocaleDateString()}</td>
                  <td>{transaction?.trainerName}</td>
                  <td>${transaction?.amount.toFixed(2)}</td>
                  <td className="text-success">Completed</td> 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Row className="mt-3">
          <Col className="d-flex justify-content-start">
            <Button 
            style={{height:"2rem"}}
              variant="secondary" 
              onClick={() => handlePageChange(page - 1)} 
              disabled={page === 1}
            >
              Prev
            </Button>
          </Col>
          <Col className="d-flex justify-content-end text-white">
            <Button 
            style={{height:"2rem"}}
              variant="secondary" 
              onClick={() => handlePageChange(page + 1)} 
              disabled={page === totalPages || paginatedHistory.length < limit}
            >
              Next
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentHistory;
