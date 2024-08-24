import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../Utils/auth';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
  
    if (loading) {
      return <div>Loading...</div>; 
    }
  
    if (isAuthenticated === false) {
      return <Navigate to="/admin/login" replace />;
    }
  
    return children;
  };
  
  export default PrivateRoute;;
