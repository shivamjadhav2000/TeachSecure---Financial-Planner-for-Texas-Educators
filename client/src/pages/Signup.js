// src/pages/SignUp.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have a context for authentication
import { signup } from '../api/api';
import { useAlert } from '../contexts/AlertContext';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const {addAlert} = useAlert();
    const navigate = useNavigate();
  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    bio: Yup.string().max(256, 'Bio must be at most 256 characters'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
        console.log(values);
        const data=await signup(values);
        console.log(data);
        if (data.success ){
            addAlert(data.message, 'success');
            navigate('/login');
            console.log('success');
        }
        if (!data.success){
            addAlert(data.message, 'error');
            console.log('error');
        }   
    } catch (error) {
      setErrors({ submit: error.message }); // Handle error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col w-full justify-center  items-center h-full'>
    <div className='w-1/3'>
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Formik
        initialValues={{ username: '', email: '', password: '',bio:'',firstName:'',lastName:'' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <Field
                type="text"
                name="firstName"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <Field
                type="text"
                name="lastName"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Field
                type="text"
                name="username"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Field
                type="password"
                name="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Your Bio</label>
              <Field
                type="textarea"
                name="bio"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
              <ErrorMessage name="bio" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
            <ErrorMessage name="submit" component="div" className="text-red-600 text-sm mt-2" />
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default SignUp;
