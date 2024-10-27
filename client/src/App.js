// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import MainLayout from './layouts/MainLayout';
import {AuthProvider,useAuth} from './contexts/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import GoalSetting from './pages/GoalSettings';
import ProjectionCalculator from './pages/ProjectionCalculator';
import ScenarioAnalysis from './pages/ScenarioAnalysis';
import InvestmentGrowth from './pages/InvestmentGrowth';
import LandingPage from './pages/LandingPage';
import { AlertProvider } from './contexts/AlertContext';


function App() {
  return (
    <AlertProvider>
    <AuthProvider>
      <Router>
       
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<MainLayout />}>
            <Route path="/Dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/goal-setting" element={<PrivateRoute element={<GoalSetting />} />} />
            <Route path="/projection-calculator" element={<PrivateRoute element={<ProjectionCalculator/>} />} />
            <Route path="/scenario-analysis" element={<PrivateRoute element={<ScenarioAnalysis/>} />} />
            <Route path="/investment-growth" element={<PrivateRoute element={<InvestmentGrowth/>} />} />
           
            <Route path="*" element={<h1>Not Found</h1>} />

          </Route>

        </Routes>
      </Router>

    </AuthProvider>
    </AlertProvider>

  );
}

export default App;
