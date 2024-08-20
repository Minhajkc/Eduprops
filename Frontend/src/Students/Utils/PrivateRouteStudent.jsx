import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStudent from '../Utils/useAuthStudent';

const PrivateRouteStudent = ({ children }) => {
    const { studentIsAuth, studentLoading } = useAuthStudent();
  
    if (studentLoading) {
        return <div>Loading...</div>; 
    }
  
    if (!studentIsAuth) {
        return <Navigate to="/signin" replace />;
    }
  
    return children;
};

export default PrivateRouteStudent;
