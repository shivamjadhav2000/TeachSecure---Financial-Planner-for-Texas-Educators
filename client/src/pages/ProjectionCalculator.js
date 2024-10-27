import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const ProjectionCalculator = () => {
  const [result, setResult] = useState(null); // State to hold the result
  const {user}=useAuth()
  const calculateYearsToRetirement = (targetDateString, currentAge, retirementAge) => {
    const targetDate = new Date(targetDateString);
    const currentDate = new Date();
    const yearsToRetirement = (targetDate - currentDate) / (1000 * 60 * 60 * 24 * 365); // Convert milliseconds to years
  
    // Ensure years to retirement falls within the user's retirement age window
    const remainingYears = retirementAge - currentAge;
    return Math.max(1, Math.min(Math.round(yearsToRetirement), remainingYears)); // At least 1 year if positive
  };
  const formik = useFormik({
    initialValues: {
      currentSavings: user.currentSavings,
      monthlyContribution: 500,
      growthRate: 5, // 5%
      yearsToRetirement: calculateYearsToRetirement(user.goals.targetDate, user.age, user.retirementAge),
    },
    validationSchema: Yup.object({
      monthlyContribution: Yup.number()
        .required('Required')
        .min(1, 'Must be at least $1'),
      growthRate: Yup.number()
        .required('Required')
        .min(0, 'Must be a positive value'),
      yearsToRetirement: Yup.number()
        .required('Required')
        .min(1, 'Must be at least 1 year'),
    }),
    onSubmit: (values) => {
      const { monthlyContribution, growthRate, yearsToRetirement } = values;
      const futureValue = calculateProjection(monthlyContribution, growthRate / 100, yearsToRetirement);
      setResult(`Projected Income: $${futureValue.toFixed(2)}`);
    },
  });
  
  const calculateProjection = (monthlyContribution, growthRate, yearsToRetirement) => {
    let futureValue = formik.values.currentSavings;
    const totalMonths = yearsToRetirement * 12;

    for (let i = 0; i < totalMonths; i++) {
      futureValue += monthlyContribution;
      futureValue *= 1 + growthRate / 12; // Compounding monthly
    }

    return futureValue;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Retirement Projection Calculator</h1>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1" htmlFor="monthlyContribution">Monthly Contribution ($)</label>
          <input
            id="monthlyContribution"
            type="number"
            {...formik.getFieldProps('monthlyContribution')}
            className={`border rounded p-2 ${formik.touched.monthlyContribution && formik.errors.monthlyContribution ? 'border-red-500' : ''}`}
          />
          {formik.touched.monthlyContribution && formik.errors.monthlyContribution ? (
            <div className="text-red-500 text-sm">{formik.errors.monthlyContribution}</div>
          ) : null}
        </div>
        <div>
          <label className="block mb-1" htmlFor="growthRate">Estimated Growth Rate (%)</label>
          <input
            id="growthRate"
            type="number"
            {...formik.getFieldProps('growthRate')}
            className={`border rounded p-2 ${formik.touched.growthRate && formik.errors.growthRate ? 'border-red-500' : ''}`}
          />
          {formik.touched.growthRate && formik.errors.growthRate ? (
            <div className="text-red-500 text-sm">{formik.errors.growthRate}</div>
          ) : null}
        </div>
        <div>
          <label className="block mb-1" htmlFor="yearsToRetirement">Years to Retirement</label>
          <input
            id="yearsToRetirement"
            type="number"
            {...formik.getFieldProps('yearsToRetirement')}
            className={`border rounded p-2 ${formik.touched.yearsToRetirement && formik.errors.yearsToRetirement ? 'border-red-500' : ''}`}
          />
          {formik.touched.yearsToRetirement && formik.errors.yearsToRetirement ? (
            <div className="text-red-500 text-sm">{formik.errors.yearsToRetirement}</div>
          ) : null}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Calculate Projection
        </button>
      </form>

      {/* Display the result */}
      {result && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded">
          {result}
        </div>
      )}
    </div>
  );
};

export default ProjectionCalculator;
