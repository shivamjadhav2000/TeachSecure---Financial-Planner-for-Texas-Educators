import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">TeachSecure</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/Dashboard" className="text-white hover:text-gray-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/settings" className="text-white hover:text-gray-300">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-white hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/goal-setting" className="text-white hover:text-gray-300">
              Goal Setting
            </Link>
          </li>
          <li>
            <Link to="/projection-calculator" className="text-white hover:text-gray-300">
              Projection Calculator
            </Link>
          </li>
          <li>
            <Link to="/scenario-analysis" className="text-white hover:text-gray-300">
              Scenario Analysis
            </Link>
          </li>
          <li>
            <Link to="/investment-growth" className="text-white hover:text-gray-300">
              Investment Growth
            </Link>
          </li>
          {user ? (
            <li>
              <button
                onClick={logoutUser}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
