// src/Admin/Pages/AdminHomePage.js
import React from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Dashboard from '../Components/Layout/DashBoard';


const AdminHomePage = () => {
  return (
    <div>
      <div className="flex h-screen bg-gray-100 font-roboto">
      <Sidebar />
      <Dashboard/>
      </div>
    </div>
  );
};

export default AdminHomePage;
