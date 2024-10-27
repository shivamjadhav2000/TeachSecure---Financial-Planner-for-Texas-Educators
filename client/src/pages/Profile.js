import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { profileUpdate } from '../api/api';

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Simulated fetching user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        const fetchedData = {
          username: user.username,
          email: user.email,
          currentAge: user.currentAge || 'N/A', // Replace with actual data
          retirementAge: user.retirementAge || 'N/A', // Replace with actual data
          goals:{...user.goals},
          contributions: [
            { type: 'TRS', amount: 500 },
            { type: '403(b)', amount: 300 },
            { type: 'IRA', amount: 200 },
          ],
        };
        setProfileData(fetchedData);
      }
    };

    fetchProfileData();
  }, [user]);

  if (!profileData) {
    return <div className="text-center">Loading...</div>;
  }

  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    currentAge: Yup.number()
      .required('Current age is required')
      .min(18, 'Minimum age is 18')
      .max(100, 'Maximum age is 100'),
    retirementAge: Yup.number()
      .required('Retirement age is required')
      .min(Yup.ref('currentAge'), 'Retirement age must be greater than current age')
      .max(100, 'Maximum age is 100'),
  });

  // Toggle edit mode
  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="profile-page p-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      <Formik
        initialValues={{
          username: profileData.username,
          email: profileData.email,
          currentAge: user.currentAge || 'N/A', // Replace with actual data
          retirementAge: user.retirementAge || 'N/A', // Replace with actual data
          goals:{...user.goals},

        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log('Updated Profile Data:', values);
          setProfileData((prevData) => ({ ...prevData, ...values }));
          await profileUpdate(values);
          setIsEditing(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">User Information</h2>

              <div className="mb-2">
                <label className="block font-medium">Username</label>
                {isEditing ? (
                  <Field
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  <p>{profileData.username}</p>
                )}
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-2">
                <label className="block font-medium">Email</label>
                {isEditing ? (
                  <Field
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  <p>{profileData.email}</p>
                )}
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-2">
                <label className="block font-medium">Current Age</label>
                {isEditing ? (
                  <Field
                    name="currentAge"
                    type="number"
                    value={values.currentAge}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  <p>{profileData.currentAge}</p>
                )}
                <ErrorMessage name="currentAge" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-2">
                <label className="block font-medium">Retirement Age</label>
                {isEditing ? (
                  <Field
                    name="retirementAge"
                    type="number"
                    value={values.retirementAge}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  <p>{profileData.retirementAge}</p>
                )}
                <ErrorMessage name="retirementAge" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold">Retirement Contributions</h2>
              <ul className="list-disc pl-5">
                {profileData.contributions.map((contribution, index) => (
                  <li key={index}>
                    {contribution.type}: ${contribution.amount}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-x-2">
              {isEditing ? (
                <>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={logoutUser}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
