import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStudent from '../Utils/useAuthStudent';
import {Spin} from 'antd'

const PublicRouteGuard = ({ children }) => {
    const { studentIsAuth, studentLoading } = useAuthStudent();

    if (studentLoading) {
        return  <div className="flex items-center justify-center h-screen bg-gray-100">
        <Spin  size='large'/>;
    </div>;
    }

    if (studentIsAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRouteGuard;
