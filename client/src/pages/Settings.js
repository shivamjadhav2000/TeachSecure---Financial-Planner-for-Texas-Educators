// src/pages/Settings.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Simulated fetching user settings data
  useEffect(() => {
    if (user) {
      // Simulating fetching data (replace with actual API call)
      const fetchUserData = async () => {
        // Simulated user data
        const fetchedData = {
          email: 'teacher@example.com', // Replace with real data
        };
        setEmail(fetchedData.email);
      };

      fetchUserData();
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically send the updated data to the server
    console.log('Updated Email:', email);
    console.log('Updated Password:', password);
    // Reset password field after submission
    setPassword('');
    alert('Settings updated successfully!');
  };

  return (
    <div className="settings-page p-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
