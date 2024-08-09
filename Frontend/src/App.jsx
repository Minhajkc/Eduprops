import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Students/Components/Layout/Navbar';
import './App.css';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <ToastContainer />
    </Router>
  );
}

export default App;