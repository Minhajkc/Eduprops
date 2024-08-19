import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignUpPage from './Students/Pages/SignUpPage';
import LoginPage from './Students/Pages/LoginPage';
import ContactPage from './Students/Pages/ContactPage';
import AboutPage from './Students/Pages/AboutPage';
import HomePage from './Students/Pages/HomePage';
import AdminLoginPage from './Admin/Pages/AdminLoginPage';
import AdminHomePage from './Admin/Pages/AdminHomePage'; // Import the AdminHomePage
import PrivateRoute from './Admin/Utils/PrivateRoute';
import StudentAuth from './Admin/Pages/StudentAuth'; // Import PrivateRoute
import useAuth from './Admin/Utils/auth'; // Import the authentication hoo
import MentorApply from './Students/Pages/MentorApply';
import MentorListPage from './Admin/Pages/MentorListPage';
import MentorLoginPage from './Mentor/Pages/MentorLoginPage';


const AppRoutes = () => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
      return <div>Loading...</div>; 
    }
 
  
    return (
      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/signup"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <SignUpPage />
            </motion.div>
          }
        />
        <Route
          path="/signin"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <LoginPage />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <ContactPage />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <AboutPage />
            </motion.div>
          }
        />
        <Route
          path="/Mentorapply"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <MentorApply />
            </motion.div>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>   
              <AdminHomePage />
            </PrivateRoute>
          }
        />
        <Route
        path='/admin/StudentsAuth'
        element={
            <PrivateRoute isAuthenticated={isAuthenticated}>   
          <StudentAuth />
          </PrivateRoute>
        }
        />
        <Route
        path='/admin/MentorAuth'
        element={
            <PrivateRoute isAuthenticated={isAuthenticated}>   
          <MentorListPage/>
          </PrivateRoute>
        }
        />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/mentor" element={<MentorLoginPage />} />
      </Routes>
    );
  };
  
  export default AppRoutes;