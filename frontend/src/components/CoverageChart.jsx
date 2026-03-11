import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CoverageChart = ({ data }) => {
  const chartData = [
    { name: "Completed", value: data.completed, color: "#3AE374" },
    { name: "Remaining", value: data.total - data.completed, color: "#1E1E1E" },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div
          style={{
            background: "#1A1A1A",
            border: "1px solid #2A2A2A",
            borderRadius: "6px",
            padding: "8px 12px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "#eee",
          }}
        >
          {payload[0].name}: {payload[0].value} topics
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 220, position: "relative" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            startAngle={90}
            endAngle={-270}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "28px",
            fontWeight: "700",
            color: "#3AE374",
          }}
        >
          {data.percentage}%
        </div>
        <div style={{ fontSize: "10px", color: "#666", letterSpacing: "1px" }}>COVERED</div>
      </div>
    </div>
  );
};

export default CoverageChart;
