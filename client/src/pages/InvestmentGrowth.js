import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const InvestmentGrowth = () => {
  const formik = useFormik({
    initialValues: {
      initialInvestment: 25000, // Dummy data
      growthRate: 5, // Displayed as percentage
      years: 30,
    },
    validationSchema: Yup.object({
      initialInvestment: Yup.number()
        .required('Required')
        .min(0, 'Must be at least $0'),
      growthRate: Yup.number()
        .required('Required')
        .min(0, 'Must be at least 0%')
        .max(100, 'Cannot exceed 100%'),
      years: Yup.number()
        .required('Required')
        .min(1, 'Must be at least 1 year'),
    }),
    onSubmit: (values) => {
      calculateGrowth(values);
    },
  });

  const calculateGrowth = (values) => {
    const futureValue = values.initialInvestment * Math.pow(1 + values.growthRate / 100, values.years);
    formik.setFieldValue('estimatedGrowth', futureValue.toFixed(2));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Investment Growth Estimation</h1>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block mb-1" htmlFor="initialInvestment">Initial Investment ($)</label>
          <input
            id="initialInvestment"
            type="number"
            {...formik.getFieldProps('initialInvestment')}
            className={`border rounded p-2 ${formik.touched.initialInvestment && formik.errors.initialInvestment ? 'border-red-500' : ''}`}
          />
          {formik.touched.initialInvestment && formik.errors.initialInvestment ? (
            <div className="text-red-500 text-sm">{formik.errors.initialInvestment}</div>
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
          <label className="block mb-1" htmlFor="years">Years of Investment</label>
          <input
            id="years"
            type="number"
            {...formik.getFieldProps('years')}
            className={`border rounded p-2 ${formik.touched.years && formik.errors.years ? 'border-red-500' : ''}`}
          />
          {formik.touched.years && formik.errors.years ? (
            <div className="text-red-500 text-sm">{formik.errors.years}</div>
          ) : null}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Estimate Growth
        </button>
      </form>
      {formik.values.estimatedGrowth && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Estimated Value After {formik.values.years} Years</h2>
          <p className="text-2xl">${formik.values.estimatedGrowth}</p>
        </div>
      )}
    </div>
  );
};

export default InvestmentGrowth;
