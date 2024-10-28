import React, { useState } from 'react';
import { emailSubscription } from '../../../Services/studentService'; // Import your function here

const SubscriptionUpdate = () => {
  const [email, setEmail] = useState(''); // State to store email input

  const handleSubscribe = async () => {
    if (!email) {
      // Show error if email is empty
      showToastError("Please enter a valid email address.");
      return;
    }

    // Call the emailSubscription function
    const response = await emailSubscription(email);
    if (response) {
      setEmail(''); // Clear email input on successful subscription
    }
  };

  return (
    <div className="bg-custom-cyan2 rounded-xl p-8 text-white text-center relative overflow-hidden mx-2 lg:mx-10 font-roboto">
      <h2 className="text-3xl font-bold mb-2">Subscribe For Updates on New Courses</h2>
      <p className="mb-6">20k+ students daily learn with Eduvi. Subscribe for new courses.</p>
      <div className="flex max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-4 py-2 rounded-l-full text-gray-800"
        />
        <button
          onClick={handleSubscribe} // Call handleSubscribe on click
          className="bg-custom-cyan hover:bg-cyan-500 px-6 py-2 rounded-r-full transition duration-300"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscriptionUpdate;
