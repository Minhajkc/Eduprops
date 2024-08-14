import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // For menu icon
import { AdminLogout } from '../../../Services/adminService';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await AdminLogout(navigate); // Call AdminLogout and pass navigate
  };

  return (
    <div className="relative">

      <button
        className="lg:hidden p-4 text-white bg-blue-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-blue-900 text-white w-64 p-6 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:flex lg:flex-col lg:w-64`}
      >
        <div className="text-xl font-bold mb-4">EduDash</div>
        <ul className="flex flex-col space-y-4">
          <li><Link to="/admin/dashboard" className="hover:text-blue-300">Home</Link></li>
          <li><Link to="/admin/courses" className="hover:text-blue-300">Courses</Link></li>
          <li><Link to="/admin/ads" className="hover:text-blue-300">Ads</Link></li>
          <li><Link to="/admin/StudentsAuth" className="hover:text-blue-300">Authentication</Link></li>
          <li><Link to="/admin/statistics" className="hover:text-blue-300">Statistics</Link></li>
          <li><Link to="/admin/settings" className="hover:text-blue-300">Settings</Link></li>
          <li><Link to="/admin/MentorAuth" className="hover:text-blue-300">Mentor's Room</Link></li>
        </ul>
        <button className="mt-auto text-left text-white hover:text-blue-300" onClick={handleLogout}>Sign Out</button>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default Sidebar;
