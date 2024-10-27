// src/pages/Dashboard.js
import React from 'react';
import ChartComponent from '../components/ChartComponent'; // Import the reusable ChartComponent
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth(); // Retrieve user context
  const dummyData = {
    totalContributions: 25000,
    savingsGoal: 50000,
    recentActivity: [
      { date: '2024-10-20', action: 'Contribution of $500 to TRS' },
      { date: '2024-10-15', action: 'Updated 403(b) allocation' },
      { date: '2024-10-10', action: 'IRA contribution of $200' },
    ],
    contributionsOverTime: [500, 800, 1000, 1200, 700, 900, 1100],
  };

  // Chart data setup
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Contributions Over Time',
        data: dummyData.contributionsOverTime,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: true, // Ensure the chart scales correctly
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Contributions Over Time',
        },
    },
    scales: {
        x: {
            ticks: {
              font: {
                size: 10, // Adjust font size for better scaling
              },
            },
          },
          y: {
            ticks: {
              font: {
                size: 10, // Adjust font size for better scaling
              },
            },
          },
    },
};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'User'}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Summary Cards */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Contributions</h2>
          <p className="text-2xl">${dummyData.totalContributions}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Savings Goal</h2>
          <p className="text-2xl">${dummyData.savingsGoal}</p>
        </div>
      </div>

      {/* Contributions Over Time Chart */}
      <ChartComponent chartData={chartData} chartOptions={chartOptions} />

      {/* Recent Activity */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        <ul>
          {dummyData.recentActivity.map((activity, index) => (
            <li key={index} className="border-b py-2">
              <span className="font-medium">{activity.date}</span>: {activity.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
