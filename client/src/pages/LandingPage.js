// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-5xl font-extrabold mb-4 text-primary">Welcome to Financial Planner</h1>
      <p className="text-xl text-center mb-8 text-secondary">
        A budgeting tool specifically designed for Texas teachers, helping you balance contributions and plan for a secure financial future.
      </p>
      <img src='image.png' alt="Landing" className="w-full max-w-lg mb-8 rounded-lg shadow-lg" />
      <div className="flex space-x-4">
        <Link to="/login" className="bg-button  px-6 py-3 rounded-lg shadow hover:bg-button-hover transition"
            style={{backgroundColor:'var(--button-accent)'}}
            >
          Login
        </Link>
        <Link to="/signup" className="bg-button-accent px-6 py-3 rounded-lg shadow"
            >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
