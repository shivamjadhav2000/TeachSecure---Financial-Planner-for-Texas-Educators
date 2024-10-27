// src/pages/GoalSetting.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFormik } from 'formik';

const GoalSetting = () => {
  const { user, setUserData } = useAuth();
  const [currentSavings, setCurrentSavings] = useState(25000); // Dummy data

  const formik = useFormik({
    initialValues: {
      savingsGoal: '',
    },
    onSubmit: (values) => {
      // Update user context with the new savings goal
      setUserData({ ...user, savingsGoal: values.savingsGoal });
      alert('Savings goal set successfully!');
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Set Your Retirement Savings Goal</h1>
      <form onSubmit={formik.handleSubmit} className="mb-4">
       
        <label className="block mb-2">
          Savings Goal ($):
          <input
            type="number"
            name="savingsGoal"
            value={formik.values.savingsGoal}
            onChange={formik.handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Set Goal
        </button>
      </form>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold">Current Savings</h2>
        <p className="text-2xl">${currentSavings}</p>
        <h2 className="text-lg font-semibold">Savings Goal</h2>
        <p className="text-2xl">${user.savingsGoal || 'Not Set'}</p>
      </div>
    </div>
  );
};

export default GoalSetting;
