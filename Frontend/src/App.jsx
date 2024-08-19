import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Students/Components/Layout/Navbar';
import './App.css';
import AppRoutes from './AppRoutes';


const App = () => {
  return (
    <Router>
        
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
      <ToastContainer />

    </Router>
  );
};

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isMentorRoute = location.pathname.startsWith('/mentor')

  return (
    <>
      {!isAdminRoute && !isMentorRoute && <Navbar />}
      <AppRoutes />
    </>
  );
};

export default App;
