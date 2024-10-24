import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const TrainerPieChart = ({ videosCount, reviewCount, revenue }) => {
  const data = [
    { name: "Total Videos", value: videosCount },
    { name: "Total Review", value: reviewCount },
    { name: "Total Revenue", value: revenue },
  ];

  const COLORS = ["#36A2EB", "#FF6384", "#FFCE56"];
  return (
    <div style={{ display: "flex", alignItems: "center", height: 190 }}>

      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}  
              endAngle={0}      
              data={data}
              cx="50%"          
              cy="50%"          
              outerRadius={80}   
              fill="#8884d8"
              label             
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ flex: 1, paddingLeft: "20px", textAlign: "left" }}>
        <h5 style={{ color: COLORS[0] }}>Total Videos: {videosCount}</h5>
        <h5 style={{ color: COLORS[1] }}>Total Review: {reviewCount}</h5>
        <h5 style={{ color: COLORS[2] }}>Total Revenue: $ {revenue}</h5>
      </div>
    </div>
  );
};

export default TrainerPieChart;
