import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { fetchDataForDashboard } from "../../redux/admin/adminThunk";
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

function AdminDashboard() {
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
    dispatch(fetchDataForDashboard({ startDate, endDate })).then((res) => {
      setData(res.payload.data);
    });
  }, [dispatch, startDate, endDate]);

  return (
    <div className="flex-grow-1 text-white md-6">
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
        <button onClick={() => setFilter("year")} className="btn gradient-blue-white">
          1 Year
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" />
          <Line
            type="monotone"
            dataKey="trainers"
            stroke="#82ca9d"
            name="Trainers"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AdminDashboard;
