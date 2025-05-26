import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Indigo color palette
const COLORS = ["#6366F1", "#4F46E5", "#4338CA", "#3730A3", "#312E81"];

const ExpenseChart = ({ type, expenses, height = 220 }) => {
  const prepareBarData = () => {
    const grouped = expenses.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + Number(curr.amount);
      return acc;
    }, {});
    return Object.entries(grouped).map(([date, amount]) => ({ date, amount }));
  };

  const preparePieData = () => {
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  };

  // Custom label to show category name instead of value
  const renderPieLabel = ({ name }) => name;

  if (type === "bar") {
    return (
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={prepareBarData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={{ value: "Date", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "Amount", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={preparePieData()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            label={renderPieLabel}
          >
            {preparePieData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
