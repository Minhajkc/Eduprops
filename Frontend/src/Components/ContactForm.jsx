import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData); // Handle form submission logic here
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="relative flex items-center justify-center  min-h-screen bg-white overflow-hidden">     
    <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-cyan-500 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-cyan-700 rounded-full opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
    <div className="bg-cu p-8 rounded-lg shadow-lg flex flex-col lg:flex-row max-w-7xl w-full mt-6 relative z-10">
      <div className="w-full lg:w-2/3 pb-5 lg:p-10">
        <h2 className="text-4xl font-bold text-center mb-10 text-custom-cyan2">CONTACT US</h2>
        <h3 className="text-xl mb-6 text-gray-600">Leave us a message</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg h-40"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          <button type="submit" className="w-full bg-custom-cyan text-white p-4 rounded-lg hover:bg-cyan-500">
            Send
          </button>
        </form>
      </div>
      <div className="w-full lg:w-1/3 p-5 lg:p-10 bg-gray-200 rounded-lg flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-cyan-500">Eduprops</h3>
          <p className="text-gray-600 mb-1">B 37/3 Ground Floor Double</p>
          <p className="text-gray-600 mb-1">Story, Ramesh Nagar, Near Raja Garden</p>
          <p className="text-gray-600 mb-1">Chowk, Delhi: 110015</p>
          <p className="text-gray-600 mb-1">525255555555</p>
          <p className="text-gray-600 mb-1">hello@info.com.ng</p>
        </div>
        <div className="mt-4">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.904573793613!2d75.87766457475123!3d11.25686658580816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65bb5dd8f2d6b%3A0x489eae5220c9a91b!2sHiLITE%20Business%20Park%2C%20Calicut!5e0!3m2!1sen!2sin!4v1605205373827!5m2!1sen!2sin"
            className="w-full h-48 border-0 rounded-lg"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ContactForm;
