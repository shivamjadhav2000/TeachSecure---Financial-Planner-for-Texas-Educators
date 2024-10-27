import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ element }) => {

    const { user } = useAuth();
    return user ? element : <Navigate to="/login" />;
  };

  export default PrivateRoute;