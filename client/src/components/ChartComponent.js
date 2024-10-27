// src/components/ChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ chartData, chartOptions }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 my-4">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
