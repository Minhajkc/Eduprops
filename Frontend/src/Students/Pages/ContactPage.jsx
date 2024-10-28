import { useState } from 'react';
import { submitContactForm } from '../../Services/studentService';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Step 1: Loading state

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true); // Step 2: Set loading to true before the request
      try {
        await submitContactForm(formData);
        console.log('Message sent successfully');
        // Optionally reset form or display a success message
        setFormData({ name: '', email: '', message: '' });
        setErrors({}); // Clear errors if any
      } catch (error) {
        console.error('Error during form submission:', error);
        // Display the error to the user if needed
        alert(error.message); // Show error message to the user
      } finally {
        setLoading(false); // Step 3: Set loading to false after the request completes
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
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
            <button
              type="submit"
              className={`w-full bg-custom-cyan text-white p-4 rounded-lg hover:bg-cyan-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Step 2: Update button styling based on loading
              disabled={loading} // Step 3: Disable button while loading
            >
              {loading ? 'Sending...' : 'Send'} {/* Step 2: Change button text based on loading */}
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/3 p-5 lg:p-10 bg-gray-200 rounded-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-500">Eduprops</h3>
            <p className="text-gray-600 mb-1">Face 1</p>
            <p className="text-gray-600 mb-1">Hilite Business Park, 3rd Floor</p>
            <p className="text-gray-600 mb-1">Palazhi,Calicut</p>
            <p className="text-gray-600 mb-1">+91 7034936080</p>
            <p className="text-gray-600 mb-1">Eduprops@gmail.com</p>
          </div>
          <div className="mt-">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.184318261222!2d75.83133887509544!3d11.247847588931057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6597c304c1f3b%3A0xbb7abc23c1ea8a!2sHiLITE%20Business%20Park!5e0!3m2!1sen!2sin!4v1730111485370!5m2!1sen!2sin"
    className="w-full h-64 rounded-lg border-0" // Set width to 100% and height to a specific value
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
