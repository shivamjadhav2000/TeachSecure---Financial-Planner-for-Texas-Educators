// src/pages/GoalSetting.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFormik } from 'formik';
import {SetTargetGoal} from '../api/api'
import {useAlert} from '../contexts/AlertContext'

const GoalSetting = () => {
  const { user, setUserData } = useAuth();
  const [currentSavings, setCurrentSavings] = useState(25000); // Dummy data
  const {addAlert} =useAlert()
  console.log("user",user)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
  const formik = useFormik({
    initialValues: {
      savingsGoal: user?.goals?.targetAmount || 'N/A',
      targetDate : user?.goals?.targetDate ?formatDate(new Date(user.goals.targetDate)) : formatDate(new Date())
    },
    onSubmit: async (values) => {
      // Update user context with the new savings goal
      setUserData({ ...user, savingsGoal: values.savingsGoal });
      const data=await SetTargetGoal({targetDate:values.targetDate,targetAmount:values.savingsGoal},user.token)
      console.log("data==",data)
      if (data && data.success){
        addAlert(data.message,'success')
      }
      else{
        addAlert(data.message,'error')
      }
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Set Your Retirement Savings Goal</h1>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div>
          <label className='block mb-2'>
            Target Date
          </label>
          <input 
          type="date"
          name='targetDate'
          value={formik.values.targetDate}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
          required
          />
        </div>
       <div>
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
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Set Goal
        </button>
      </form>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold">Current Savings</h2>
        <p className="text-2xl">${currentSavings}</p>
        <h2 className="text-lg font-semibold">Savings Goal</h2>
        <p className="text-2xl">${user.goals.targetAmount || 'Not Set'}</p>
      </div>
    </div>
  );
};

export default GoalSetting;
