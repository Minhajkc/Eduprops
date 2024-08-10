import React, { useState } from 'react';
import { AdminLogin } from '../../Services/adminService';
import { showToastSuccess, showToastError, showToastWarning } from '../../utils/toastify'


const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      hasErrors = true;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return; 
    }

    try {
      const formData = { username, password };
      const response = await AdminLogin(formData);  
    } catch (error) {
      showToastError(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row w-full max-w-screen-lg px-4 py-6 sm:px-6 sm:py-8 lg:px-0 lg:py-0">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-cyan-600 p-8 md:p-12 text-white flex items-center justify-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Welcome to Eduprops Online Learning Platform, For Admin
            </h1>
            <div className="mt-4 md:mt-8">
              {/* Add an illustration or icon here */}
              <img src="src/assets/images/Logoblack2.png" alt="Learning illustration" className="w-full max-w-xs mx-auto" />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Hi, Admin!</h2>
          <p className="mb-6 text-gray-600">
            Login With UserName and Password
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                User name
              </label>
              <input
                type="text"
                id="username"
                className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-3xl focus:outline-none focus:ring-2 ${errors.username ? 'focus:ring-red-500' : 'focus:ring-cyan-600'}`}
                placeholder="Enter your User name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-3xl focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-cyan-600'}`}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          
            <button
              type="submit"
              className="w-full mt-5  bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
