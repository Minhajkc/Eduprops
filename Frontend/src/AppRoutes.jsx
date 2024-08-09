import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignUpPage from './Students/Pages/SignUpPage';
import LoginPage from './Students/Pages/LoginPage';
import ContactPage from './Students/Pages/ContactPage';
import AboutPage from './Students/Pages/AboutPage';
import HomePage from './Students/Pages/HomePage';


const AppRoutes = () => {
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

   
     
    </Routes>
  );
};

export default AppRoutes;
