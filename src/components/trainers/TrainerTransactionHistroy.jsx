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
  const currentTransactions = history.slice(
    startIndex,
    startIndex + transactionsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateRemainingDays = (expirationDate) => {
    const currentDate = new Date();
    const expiryDate = new Date(expirationDate);
    const timeDiff = expiryDate - currentDate;
    const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return remainingDays;
  };

  const hasExpired = (expiredAt) => {
    return new Date(expiredAt) < new Date();
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 h-100 mt-5">
        <div
          className="glass-effect p-3"
          style={{ width: "95%", height: "90%" }}
        >
          <h3 className="text-white m-0 mb-3">Transaction History</h3>
          <Table responsive hover className="table-dark text-white">
            <thead>
              <tr>
                <th>Date</th>
                <th>Remaining Days</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {!hasExpired(transaction?.expiredAt) ? (
                        <p>
                          {calculateRemainingDays(transaction?.expiredAt)} days
                          remaining
                        </p>
                      ) : (
                        <p className="error">Expired</p>
                      )}
                    </td>
                    <td>{transaction.userName}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
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
