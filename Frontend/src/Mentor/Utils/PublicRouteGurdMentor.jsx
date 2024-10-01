import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthMentor from '../Utils/Mentorauth';
import {Spin} from 'antd'

const PublicRouteGuardMentor = ({ children }) => {
    const {  mentorIsAuth, mentorLoading } = useAuthMentor();

    if (mentorLoading) {
        return  <div className="flex items-center justify-center h-screen bg-gray-100">
        <Spin  size='large'/>;
    </div>;
    }

    if (mentorIsAuth) {
        return <Navigate to="/mentor/dashboard" replace />;
    }

    return children;
};

export default PublicRouteGuardMentor;
