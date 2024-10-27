// src/pages/SignUp.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have a context for authentication
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {login} from '../api/api';
import { useAlert } from '../contexts/AlertContext';


const Login = () => {
  const { setUserData ,user} = useAuth(); // Your signup function
    const { addAlert } = useAlert();
    const navigate = useNavigate();
  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
        const data= await login(values);
        console.log(data,"<<<<<<<<<<");
        if (data.success ){
            setUserData(data.data);
            addAlert('Login Successful', 'success');
        }
        if (!data.success){
            addAlert(data.message, 'error');

        }
      // Handle successful signup (e.g., redirect to dashboard or show a success message)
    } catch (error) {
      setErrors({ submit: error.message }); // Handle error
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => { 
    if(user){
        navigate('/Dashboard');
    }} ,[user])

  return (
    <div className='flex w-full h-full border flex-col items-center justify-center'>
    <div className='w-1/3 text-center'>

      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4 text-left">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Field
                type="text"
                name="username"
                className="mt-1 p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4 text-left">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Field
                type="password"
                name="password"
                className="mt-1 p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <ErrorMessage name="submit" component="div" className="text-red-600 text-sm mt-2" />
          </Form>
        )}
      </Formik>
    </div>
    </div>

  );
};

export default Login;
