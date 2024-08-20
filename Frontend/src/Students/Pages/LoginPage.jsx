import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {  showToastError, showToastWarning } from '../../utils/toastify';
import { loginStudent } from '../../Services/studentService';
import { registerStudent, handleGoogleAuth } from '../../Services/studentService';
import GoogleAuthButton from '../Components/Common/TempGoogleAuthButton';
import { Spin } from 'antd';
import ForgotPasswordModal from '../Components/Layout/ForgotPasswordModal';



const LoginPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true); 
        try {
          await loginStudent(formData,navigate);
          setLoading(false); 
        } catch (error) {
          setLoading(false);
        }
    } 
};
const handleGoogleSuccess = async (response) => {
  setLoading(true);
  try {
    await handleGoogleAuth(response,navigate);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    showToastError(error);
  }
};

const handleGoogleFailure = () => {
  showToastError('Authentication failed !');
};

  return (
    
    <div className=" flex flex-col justify-center items-center min-h-screen p-4 lg:p-0 font-roboto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl lg:flex">
        {/* Left side */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-custom-cyan2 to-cyan-600 p-8 flex flex-col justify-center items-center">
          <img src="src/assets/images/Logoblack2.png" alt="Eduprops Logo" className="w-24 lg:w-36 mb-6 filter drop-shadow-md" />
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6 text-center leading-tight">
            Welcome to Eduprops
            <span className="block text-xl lg:text-3xl mt-2 font-normal">Your Gateway to Online Learning</span>
          </h1>
          <div className="w-full max-w-md">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
              <img src="src/assets/images/SignUpimage.PNG" alt="Learning Illustration" className="w-full mx-auto" />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">Login to your account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                className="w-full p-3 border rounded-lg"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="w-full">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full p-3 border rounded-lg"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
            </div>
            <div className="flex items-center text-sm ml-1">
              <a onClick={() => setModalIsOpen(true)} className='cursor-pointer hover:text-custom-cyan2'>Forgot Password ?</a>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
            <button
                    type="submit"
                    className={`w-full bg-custom-cyan text-white p-3 rounded-lg hover:bg-cyan-500 flex items-center justify-center ${loading ? 'opacity-60' : ''}`}
                    disabled={loading}
                >
                    {loading && <Spin className="mr-2" indicator={<div className="ant-spin-dot"><i></i><i></i><i></i><i></i></div>} />}
                    {loading ? 'Processing...' : 'Login →'}
                </button>
                <div>
          
            <ForgotPasswordModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            />
        </div>
          </form>
          <div className="mt-4 text-center">
            <p>Don't have an account? <Link to="/signup" className="text-custom-cyan">Sign Up</Link></p>
          </div>
          <div className="mt-4">
          <div className="mt-4">
         
         <GoogleAuthButton
     onSuccess={handleGoogleSuccess}
     onFailure={handleGoogleFailure}
   />
       </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
