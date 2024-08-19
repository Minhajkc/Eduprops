import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const ForgotPasswordModal = ({ isOpen, onRequestClose }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleEmailSubmit = async () => {
        try {
            // await axios.post('/api/forgot-password', { email });
            setStep(2);
            setError('');
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleOtpSubmit = async () => {
        try {
            // await axios.post('/api/verify-otp', { email, otp });
            setStep(3);
            setError('');
        } catch (err) {
            setError('Invalid OTP. Please try again.');
        }
    };

    const handlePasswordSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axios.post('/api/reset-password', { email, newPassword });
            setSuccess('Password reset successful!');
            setError('');
            setStep(1); // Reset to the first step or close the modal
        } catch (err) {
            setError('Failed to reset password. Please try again.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Forgot Password"
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Enter Your Email</h2>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={handleEmailSubmit}
                            className="mt-4 w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600"
                        >
                            Send OTP
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            onClick={handleOtpSubmit}
                            className="mt-4 w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            onClick={handlePasswordSubmit}
                            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600"
                        >
                            Reset Password
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;
