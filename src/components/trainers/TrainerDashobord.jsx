import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { trainerDashBoardData } from "../../redux/trainers/trainerThunk";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TrainerDashboard() {
  const [filter, setFilter] = useState("year");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateDates = () => {
      const now = new Date();
      switch (filter) {
        case "week":
          setStartDate(
            new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6)
          );
          setEndDate(now);
          break;
        case "month":
          setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
          setEndDate(now);
          break;
        case "year":
          setStartDate(new Date(now.getFullYear(), 0, 1));
          setEndDate(now);
          break;
        default:
          break;
      }
    };

    updateDates();
  }, [filter]);

  useEffect(() => {
    dispatch(trainerDashBoardData({ startDate, endDate })).then((res) => {
      setData(res.payload.reverse());
    });
  }, [startDate, endDate, dispatch]);

  return (
    <div className="flex-grow-1 text-white">
      <div className="mb-3">
        <button
          onClick={() => setFilter("week")}
          className="btn gradient-blue-white me-2"
        >
          1 Week
        </button>
        <button
          onClick={() => setFilter("month")}
          className="btn gradient-blue-white me-2"
        >
          1 Month
        </button>
        <button
          onClick={() => setFilter("year")}
          className="btn gradient-blue-white"
        >
          1 Year
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Line for distinct subscriptions (subscribed users) */}
          <Line
            type="monotone"
            dataKey="subscribedUsersCount"
            stroke="#8884d8"
            name="Subscribed Users"
          />
          {/* Line for total transactions */}
          <Line
            type="monotone"
            dataKey="totalTransactionsCount"
            stroke="#82ca9d"
            name="Total Transactions"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrainerDashboard;
