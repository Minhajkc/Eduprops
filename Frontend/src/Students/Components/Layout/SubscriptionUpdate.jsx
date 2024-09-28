import React from 'react';

const SubscriptionUpdate = () => {
  return (
    <div className="bg-custom-cyan2 rounded-xl p-8 text-white text-center relative overflow-hidden mx-2 lg:mx-10 font-roboto">
      <h2 className="text-3xl font-bold mb-2">Subscribe For Get Update Every New Courses</h2>
      <p className="mb-6">20k+ students daily learn with Eduvi. Subscribe for new courses.</p>
      <div className="flex max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-grow px-4 py-2 rounded-l-full text-gray-800"
        />
        <button className="bg-custom-cyan  hover:bg-custom-cyan2 px-6 py-2 rounded-r-full transition duration-300">
          Subscribe
        </button>
      </div>

    </div>
  );
};

export default SubscriptionUpdate;