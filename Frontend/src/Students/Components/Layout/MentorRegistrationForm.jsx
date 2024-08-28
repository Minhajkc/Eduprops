import React, { useState } from 'react';
import { registerMentor } from './../../../Services/mentorService';

const MentorRegistrationForm = () => {
  // Form state and validation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    degree: '',
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let formErrors = {};

    if (!formData.firstName) formErrors.firstName = 'First name is required';
    if (!formData.lastName) formErrors.lastName = 'Last name is required';
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = 'Passwords do not match';
    if (!formData.degree) formErrors.degree = 'Degree is required';
    if (!formData.resume) formErrors.resume = 'Resume is required';

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;

    setLoading(true);

    // Convert formData to FormData object
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });
    console.log(data,'daa');
    

    try {
      const response = await registerMentor(data);
      console.log('Registration successful:', response);
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        degree: '',
        resume: null,
      });
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center rounded-3xl min-h-11 mt-">
      {/* Ad Section */}
      

      {/* Form Section */}
      <div className="w-full lg:w-2/3 bg-white rounded-lg lg:p-8 pb-10 ">
        <h2 className="text-2xl font-bold mb-6 text-center">Start your instructor journey</h2>
        <form onSubmit={handleSubmit} className=' lg:p-10 lg:rounded-md border-t-4 border-custom-cyan shadow-custom-cyan lg:shadow-lg'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <div className="flex gap-4">
              <div className="w-full">
                <input
                  className={`w-full p-3 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.firstName ? 'border-red-500' : ''
                  }`}
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
              </div>
              <div className="w-full">
                <input
                  className={`w-full p-3 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.lastName ? 'border-red-500' : ''
                  }`}
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className={`w-full p-3 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username ? 'border-red-500' : ''
              }`}
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full p-3 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? 'border-red-500' : ''
              }`}
              id="email"
              type="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className={`w-full p-3 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password ? 'border-red-500' : ''
                }`}
                id="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={`w-full p-3 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="degree">
              Degree
            </label>
            <select
              className={`w-full p-3 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.degree ? 'border-red-500' : ''
              }`}
              id="degree"
              value={formData.degree}
              onChange={handleChange}
            >
              <option value="">Select your degree</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              {/* Add other degrees as needed */}
            </select>
            {errors.degree && <p className="text-red-500 text-xs italic">{errors.degree}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume">
              Resume
            </label>
            <input
              className={`w-full p-3 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.resume ? 'border-red-500' : ''
              }`}
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
            {errors.resume && <p className="text-red-500 text-xs italic">{errors.resume}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className={`bg-custom-cyan text-white px-20 py-2 rounded w-full  sm:w-auto focus:outline-none focus:shadow-outline ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <div className="w-full lg:w-1/3 bg-custom-cyan2 rounded-lg to-teal-600 flex items-center justify-center p-8 mb-8 lg:mb-0">
        {/* Add your ad content here */}
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Advertise Here</h2>
          <p>Your ad content goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default MentorRegistrationForm;
