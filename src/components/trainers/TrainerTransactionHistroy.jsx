import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { TrainerransactionHistory } from "../../redux/trainers/trainerThunk";

const TrainerTransactionHistroy = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    dispatch(TrainerransactionHistory()).then((res) =>
      setHistory(res.payload.data.transactionHistory)
    );
  }, [dispatch]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div
          className="glass-effect p-3"
          style={{ width: "95%", height: "90%" }}
        >
          <h3 className="text-white m-0 mb-3">Transaction History</h3>
          <Table responsive bordered hover className="table-dark text-white">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((transaction, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
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
        </div>
      </div>
    </>
  );
};

export default TrainerTransactionHistroy;
