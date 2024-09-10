import React from 'react';
import { Navigate } from 'react-router-dom';
import checkAuth from './auth';

const PublicRouteGuardAdmin = ({ children }) => {
    const {isAuthenticated, loading } = checkAuth();

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (isAuthenticated) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

export default PublicRouteGuardAdmin;
