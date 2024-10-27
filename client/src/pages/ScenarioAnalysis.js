import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const ScenarioAnalysis = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);

  const calculateYearsToRetirement = (targetDateString, currentAge, retirementAge) => {
    const targetDate = new Date(targetDateString);
    const currentDate = new Date();
    const yearsToRetirement = (targetDate - currentDate) / (1000 * 60 * 60 * 24 * 365); // Convert milliseconds to years
    const remainingYears = retirementAge - currentAge;
    return Math.max(1, Math.min(Math.round(yearsToRetirement), remainingYears)); // At least 1 year if positive
  };

  const formik = useFormik({
    initialValues: {
      currentSavings: user.currentSavings,
      monthlyContribution: 500,
      yearsToRetirement: calculateYearsToRetirement(user.goals.targetDate.$date, user.age, user.retirementAge),
    },
    validationSchema: Yup.object({
      currentSavings: Yup.number().required('Required').min(0, 'Must be at least $0'),
      monthlyContribution: Yup.number().required('Required').min(1, 'Must be at least $1'),
      yearsToRetirement: Yup.number().required('Required').min(1, 'Must be at least 1 year'),
    }),
    onSubmit: (values) => {
      analyzeScenarios(values);
    },
  });

  const analyzeScenarios = (values) => {
    const scenarios = [
      { label: 'Increase Contribution by 10%', change: values.monthlyContribution * 1.1 },
      { label: 'Decrease Contribution by 10%', change: values.monthlyContribution * 0.9 },
      { label: 'Retire 5 Years Earlier', change: values.yearsToRetirement - 5 },
      { label: 'Retire 5 Years Later', change: values.yearsToRetirement + 5 },
    ];

    const newResults = scenarios.map((scenario) => {
      let futureValue = values.currentSavings;
      const totalMonths = (scenario.label.includes('Retire') ? scenario.change * 12 : values.yearsToRetirement * 12);

      for (let i = 0; i < totalMonths; i++) {
        futureValue += scenario.label.includes('Contribution') ? scenario.change : values.monthlyContribution;
        futureValue *= 1 + 0.05 / 12; // Compounding monthly with 5% growth rate
      }

      return { label: scenario.label, projectedIncome: futureValue.toFixed(2) };
    });

    setResults(newResults);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Scenario Analysis</h1>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block mb-1" htmlFor="currentSavings">Current Savings ($)</label>
          <input
            id="currentSavings"
            type="number"
            {...formik.getFieldProps('currentSavings')}
            className={`border rounded p-2 ${formik.touched.currentSavings && formik.errors.currentSavings ? 'border-red-500' : ''}`}
          />
          {formik.touched.currentSavings && formik.errors.currentSavings ? (
            <div className="text-red-500 text-sm">{formik.errors.currentSavings}</div>
          ) : null}
        </div>
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
          Analyze Scenarios
        </button>
      </form>

      {/* Display results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-4">
          {results.map((res, idx) => (
            <div key={idx} className="p-4 bg-green-100 border border-green-300 text-green-700 rounded">
              <p><strong>{res.label}</strong></p>
              <p>Projected Income: ${res.projectedIncome}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScenarioAnalysis;
