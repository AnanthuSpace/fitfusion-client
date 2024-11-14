import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { TrainerransactionHistory } from "../../redux/trainers/trainerThunk";

const TrainerTransactionHistory = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 8; 

  useEffect(() => {
    dispatch(TrainerransactionHistory()).then((res) => {
      setHistory(res.payload.data || []);
    });
  }, [dispatch]);

  const totalPages = Math.ceil(history.length / transactionsPerPage);

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const currentTransactions = history.slice(startIndex, startIndex + transactionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 h-100 mt-5">
        <div className="glass-effect p-3" style={{ width: "95%", height: "90%" }}>
          <h3 className="text-white m-0 mb-3">Transaction History</h3>
          <Table responsive hover className="table-dark text-white">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                    <td>{transaction.userName}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td className="text-success">Completed</td>
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

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1} 
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages} 
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerTransactionHistory;
