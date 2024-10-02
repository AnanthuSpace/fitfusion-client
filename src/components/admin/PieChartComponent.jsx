import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const PieChartComponent = ({ usersCount, trainerCount, revenue }) => {

  const data = [
    { name: "Total Users", value: usersCount },
    { name: "Total Trainers", value: trainerCount },
    { name: "Total Revenue", value: revenue },
  ];

  const COLORS = ["#36A2EB", "#FF6384", "#FFCE56"];

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <PieChart width={300} height={185}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <div style={{ marginLeft: "20px" }}>
        <h5 style={{ color: COLORS[0] }}>Total Users: {usersCount}</h5>
        <h5 style={{ color: COLORS[1] }}>Total Trainers: {trainerCount}</h5>
        <h5 style={{ color: COLORS[2] }}>Total Revenue: {revenue}</h5>
      </div>
    </div>
  );
};

export default PieChartComponent;
