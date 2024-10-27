import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ScenarioAnalysis = () => {
  const formik = useFormik({
    initialValues: {
      currentSavings: 25000, // Dummy data
      monthlyContribution: 500,
      yearsToRetirement: 30,
    },
    validationSchema: Yup.object({
      currentSavings: Yup.number()
        .required('Required')
        .min(0, 'Must be at least $0'),
      monthlyContribution: Yup.number()
        .required('Required')
        .min(1, 'Must be at least $1'),
      yearsToRetirement: Yup.number()
        .required('Required')
        .min(1, 'Must be at least 1 year'),
    }),
    onSubmit: (values) => {
      analyzeScenarios(values);
    },
  });

  const analyzeScenarios = (values) => {
    const results = [];
    const scenarios = [
      { label: 'Increase Contribution by 10%', change: values.monthlyContribution * 1.1 },
      { label: 'Decrease Contribution by 10%', change: values.monthlyContribution * 0.9 },
      { label: 'Retire 5 Years Earlier', change: values.yearsToRetirement - 5 },
      { label: 'Retire 5 Years Later', change: values.yearsToRetirement + 5 },
    ];

    scenarios.forEach((scenario) => {
      let futureValue = values.currentSavings;
      const totalMonths = (scenario.label.includes('Retire') ? scenario.change * 12 : values.yearsToRetirement * 12);

      for (let i = 0; i < totalMonths; i++) {
        futureValue += scenario.change;
        futureValue *= 1.05 / 12; // Assuming a 5% growth rate for simplicity
      }

      results.push({ label: scenario.label, projectedIncome: futureValue.toFixed(2) });
    });

    // Store the results in the state or update the UI accordingly
    alert(JSON.stringify(results, null, 2)); // Displaying the results in an alert for now
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
    </div>
  );
};

export default ScenarioAnalysis;
