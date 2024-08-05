import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Form is valid, submit the data
      console.log('Form data:', formData);
    }
  };

  return (
    
    <div className="mt-5 flex flex-col justify-center items-center min-h-screen p-4 lg:p-0 font-roboto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl lg:flex">
        {/* Left side */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-custom-cyan2 to-cyan-600 p-8 flex flex-col justify-center items-center">
          <img src="Logoblack2.png" alt="Eduprops Logo" className="w-24 lg:w-36 mb-6 filter drop-shadow-md" />
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-6 text-center leading-tight">
            Welcome to Eduprops
            <span className="block text-xl lg:text-3xl mt-2 font-normal">Your Gateway to Online Learning</span>
          </h1>
          <div className="w-full max-w-md">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
              <img src="SignUpimage.PNG" alt="Learning Illustration" className="w-full mx-auto" />
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
            <button type="submit" className="w-full bg-custom-cyan text-white p-3 rounded-lg hover:bg-cyan-500">
              Login →
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>Don't have an account? <Link to="/signup" className="text-custom-cyan">Sign Up</Link></p>
          </div>
          <div className="mt-4">
            <button className="w-full p-3 border rounded-lg flex items-center justify-center">
              <img src="/google-icon.png" alt="Google" className="w-6 h-6 mr-2" />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
