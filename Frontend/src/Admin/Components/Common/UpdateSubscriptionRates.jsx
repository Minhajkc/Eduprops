import React, { useState, useEffect } from 'react';
import { updateSubscriptionRates, fetchSubscriptionRates } from '../../../Services/adminService';

const UpdateSubscriptionRates = () => {
  const [goldRate, setGoldRate] = useState(null);
  const [platinumRate, setPlatinumRate] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for rates
  const [rates, setRates] = useState({
    goldRate: '',
    platinumRate: '',
  });

  // Fetch rates when component mounts
  useEffect(() => {
    getRates();
  }, []);

  // Function to fetch subscription rates
  const getRates = async () => {
    try {
      const { goldRate, platinumRate } = await fetchSubscriptionRates();
      setGoldRate(goldRate);
      setPlatinumRate(platinumRate);
      setLoading(false); // Set loading false after fetching
    } catch (error) {
      console.error('Error fetching subscription rates:', error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRates({
      ...rates,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update subscription rates
      await updateSubscriptionRates(rates);
      getRates();
      setRates({
        goldRate: '',
        platinumRate: '',
      });
    } catch (error) {
      console.error('Failed to update rates:', error);
      alert('Failed to update subscription rates.');
    }
  };

  // Show loading spinner or message while fetching rates
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-gray-500">Loading subscription rates...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-7 font-roboto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Subscription Plans</h1>
        <div className="subscription-plan bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-indigo-600">Gold Plan</h2>
          <p className="text-lg text-gray-700">Current Rate: ₹{goldRate}</p>
        </div>
        <div className="subscription-plan bg-gray-50 p-4 mt-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-indigo-600">Platinum Plan</h2>
          <p className="text-lg text-gray-700">Current Rate: ₹{platinumRate}</p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Update Subscription Rates</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="goldRate" className="block text-gray-600 font-semibold mb-2">
              Gold Rate
            </label>
            <input
              type="number"
              id="goldRate"
              name="goldRate"
              value={rates.goldRate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter new gold rate"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="platinumRate" className="block text-gray-600 font-semibold mb-2">
              Platinum Rate
            </label>
            <input
              type="number"
              id="platinumRate"
              name="platinumRate"
              value={rates.platinumRate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter new platinum rate"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Update Rates
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubscriptionRates;
