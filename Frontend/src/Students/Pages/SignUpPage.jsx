import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import OtpModal from '../Components/Specific/OtpModal'
import { registerStudent, handleGoogleAuth } from '../../Services/studentService';
import GoogleAuthButton from '../Components/Common/TempGoogleAuthButton';
import { showToastSuccess, showToastError, showToastWarning } from '../../utils/toastify'


const SignUpPage = () => {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
  } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
  }
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.terms) newErrors.terms = 'You must agree to the Terms & Conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
        setLoading(true); 
        try {
            await registerStudent(formData);
            setLoading(false); 
            setShowModal(true); 
        } catch (error) {
            setLoading(false); 
        }
    }
};

const handleGoogleSuccess = async (response) => {
  setLoading(true);
  try {
    await handleGoogleAuth(response);
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
    <div className=" flex flex-col justify-center min-h-screen items-center p-4 lg:p-0 font-roboto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl lg:flex">
        {/* Right side (Cyan section) */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-custom-cyan2 to-cyan-600 p-8 flex flex-col justify-center items-center  lg:h-full ">
          <img src="src/assets/images/Logoblack2.png" alt="Eduprops Logo" className="w-24 lg:w-36 mb-6 filter drop-shadow-md" />
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6 text-center leading-tight">
            Welcome to Eduprops
            <span className="block text-xl lg:text-3xl font-normal">Your Gateway to Online Learning</span>
          </h1>
          <div className="w-full max-w-md">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
              <img src="src/assets/images/SignUpimage.PNG" alt="Learning Illustration" className="w-full mx-auto" />
            </div>
          </div>
        </div>

        {/* Left side (Form section) */}
        <div className="w-full lg:w-1/2 p-8 lg:p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">Create Your Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="w-full lg:w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-3 border rounded-lg"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div className="w-full lg:w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-3 border rounded-lg"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full p-3 border rounded-lg"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
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
              <div className="w-full lg:w-1/2">
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
              <div className="w-full lg:w-1/2">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-lg"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="mr-2"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
            <button
                    type="submit"
                    className={`w-full bg-custom-cyan text-white p-3 rounded-lg hover:bg-cyan-500 flex items-center justify-center ${loading ? 'opacity-60' : ''}`}
                    disabled={loading}
                >
                    {loading && <Spin className="mr-2" indicator={<div className="ant-spin-dot"><i></i><i></i><i></i><i></i></div>} />}
                    {loading ? 'Processing...' : 'Create Account →'}
                </button>
          </form>
          <div className="mt-4 text-center">
            <p>Already have an account? <Link to="/signin" className="text-custom-cyan">Sign In</Link></p>
          </div>
          <div className="mt-4">
         
            <GoogleAuthButton
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
      />
          </div>
        </div>
      </div>
    

<OtpModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                formData={formData}
            />
    </div>
  );
};

export default SignUpPage;
