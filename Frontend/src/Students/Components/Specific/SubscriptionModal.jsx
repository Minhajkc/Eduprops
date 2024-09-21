import React from 'react';

const SubscriptionModal = ({ isOpen, onClose, planDetails }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-2xl font-bold">{planDetails}</h2>
                <p className="mt-4 text-gray-700">{planDetails.description}</p>
                <div className="mt-4 text-xl font-bold">{planDetails.price}</div>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-custom-cyan hover:bg-custom-cyan2 text-white py-2 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SubscriptionModal;
