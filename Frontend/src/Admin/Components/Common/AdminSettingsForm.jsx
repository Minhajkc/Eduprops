import React, { useState, useEffect } from 'react';
import Sidebar from '../Layout/Sidebar';
import { fetchAdminSettings, updateAdminSettings } from '../../../Services/adminService';
import { FaPercent, FaMoneyBillWave, FaEdit } from 'react-icons/fa';

const AdminSettingsForm = () => {
    const [currentSettings, setCurrentSettings] = useState({ tax: 0, discount: 0 });
    const [newTax, setNewTax] = useState('');
    const [newDiscount, setNewDiscount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await fetchAdminSettings();
            setCurrentSettings(data);
        } catch (err) {
            setError('Failed to fetch current settings');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updateAdminSettings({ 
                tax: newTax !== '' ? Number(newTax) : currentSettings.tax, 
                discount: newDiscount !== '' ? Number(newDiscount) : currentSettings.discount 
            });
            setSuccess('Settings updated successfully');
            fetchSettings(); // Refresh current settings
            setNewTax('');
            setNewDiscount('');
        } catch (err) {
            setError('Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto p-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Settings</h2>
                    
                    
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                        <div className="bg-blue-600 text-white py-3 px-6">
                            <h3 className="text-xl font-semibold">Current Settings</h3>
                        </div>
                        <div className="p-6 flex justify-around">
                            <div className="text-center">
                                <p className="text-gray-600 mb-1">Current Tax</p>
                                <div className="text-3xl font-bold text-gray-800 flex items-center justify-center">
                                    {currentSettings.tax}<FaPercent className="ml-1 text-blue-500" size={24} />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-600 mb-1">Current Discount</p>
                                <div className="text-3xl font-bold text-gray-800 flex items-center justify-center">
                                ₹{currentSettings.discount}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gray-800 text-white py-3 px-6">
                            <h3 className="text-xl font-semibold">Update Settings</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">New Tax (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={newTax}
                                            onChange={(e) => setNewTax(e.target.value)}
                                            placeholder="Enter new tax percentage"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled={loading}
                                        />
                                        <FaPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">New Discount</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={newDiscount}
                                            onChange={(e) => setNewDiscount(e.target.value)}
                                            placeholder="Enter new discount"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled={loading}
                                        />
                                        <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out flex items-center"
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : (
                                        <>
                                            <FaEdit className="mr-2" />
                                            Update Settings
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsForm;