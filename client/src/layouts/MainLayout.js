// src/layouts/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <div className="p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
