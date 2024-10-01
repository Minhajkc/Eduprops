import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthMentor from '../Utils/Mentorauth'; // Use the mentor authentication hook
import { Spin } from 'antd';

const PrivateRouteMentor = ({ children }) => {
    const { mentorIsAuth, mentorLoading } = useAuthMentor(); // Access mentor auth state
  

    if (mentorLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <Spin size='large' />
            </div>
        );
    }
  
    if (!mentorIsAuth) {
        return <Navigate to="/mentor" replace />;
    }
  

    return children;
};

export default PrivateRouteMentor;
