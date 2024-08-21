import React, { useState } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { resetPassword, sendPasswordResetOtp, verifyPasswordResetOtp } from '../../../Services/mentorService';
import { Spin } from 'antd'; // Make sure you have antd installed

const ForgotPasswordModal = ({ isOpen, onRequestClose }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const validateEmail = () => {
        if (!email) {
            setFormErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required.' }));
            return false;
        }
        setFormErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        return true;
    };

    const validateOtp = () => {
        if (!otp) {
            setFormErrors((prevErrors) => ({ ...prevErrors, otp: 'OTP is required.' }));
            return false;
        }
        setFormErrors((prevErrors) => ({ ...prevErrors, otp: '' }));
        return true;
    };

    const validatePasswords = () => {
        let isValid = true;
        if (!newPassword) {
            setFormErrors((prevErrors) => ({ ...prevErrors, newPassword: 'New password is required.' }));
            isValid = false;
        } else if (newPassword.length < 6) {
            setFormErrors((prevErrors) => ({ ...prevErrors, newPassword: 'Password must be at least 6 characters.' }));
            isValid = false;
        } else {
            setFormErrors((prevErrors) => ({ ...prevErrors, newPassword: '' }));
        }
        if (newPassword !== confirmPassword) {
            setFormErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match.' }));
            isValid = false;
        } else {
            setFormErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
        }
        return isValid;
    };

    const handleEmailSubmit = async () => {
        if (!validateEmail()) return;
        setLoading(true);
        try {
            await sendPasswordResetOtp(email);
            setStep(2);
            setError('');
        } catch (err) {
            setError('Enter your Registered Email!');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        if (!validateOtp()) return;
        setLoading(true);
        try {
            await verifyPasswordResetOtp(email, otp);
            setStep(3);
            setError('');
        } catch (err) {
            setError('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async () => {
        if (!validatePasswords()) return;
        setLoading(true);
        try {
            await resetPassword(email, newPassword);
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
            setStep(1); 
            onRequestClose(); 
            setError('');
        } catch (err) {
            setError('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Forgot Password"
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center p-4 font-roboto"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
            >
                {/* Close button */}
                <button
                    onClick={onRequestClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                <div className="flex justify-center items-center">
    <img
        src="src/assets/images/Logoblack2.png"
        alt="Eduprops Logo"
        className="w-24 lg:w-36 mb-6 filter drop-shadow-md"
    />
</div>

             
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center text-custom-cyan2">Enter Your Registered Email</h2>
                        <input
                            type="email"
                            className={`w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                        <button
                            type="button"
                            onClick={handleEmailSubmit}
                            className={`w-full bg-custom-cyan2 text-white p-2 rounded-lg mt-5 hover:bg-cyan-500 flex items-center justify-center ${loading ? 'opacity-60' : ''}`}
                            disabled={loading}
                        >
                            {loading && <Spin className="mr-2" indicator={<div className="ant-spin-dot"><i></i><i></i><i></i><i></i></div>} />}
                            {loading ? 'Processing...' : 'Send OTP'}
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center text-custom-cyan2">Enter OTP</h2>
                        <input
                            type="text"
                            className={`w-full px-3 py-2 border ${formErrors.otp ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {formErrors.otp && <p className="text-red-500 text-sm mt-1">{formErrors.otp}</p>}
                        <button
                            type="button"
                            onClick={handleOtpSubmit}
                            className={`w-full bg-custom-cyan2 mt-5 text-white p-2 rounded-lg hover:bg-cyan-500 flex items-center justify-center ${loading ? 'opacity-60' : ''}`}
                            disabled={loading}
                        >
                            {loading && <Spin className="mr-2" indicator={<div className="ant-spin-dot"><i></i><i></i><i></i><i></i></div>} />}
                            {loading ? 'Processing...' : 'Verify OTP'}
                        </button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center text-custom-cyan2">Reset Your Password</h2>
                        <input
                            type="password"
                            className={`w-full px-3 py-2 border ${formErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-2`}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {formErrors.newPassword && <p className="text-red-500 text-sm mt-1">{formErrors.newPassword}</p>}
                        <input
                            type="password"
                            className={`w-full px-3 py-2 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4`}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
                        <button
                            type="button"
                            onClick={handlePasswordSubmit}
                            className={`w-full bg-custom-cyan2 mt-2 text-white p-2 rounded-lg hover:bg-cyan-500 flex items-center justify-center ${loading ? 'opacity-60' : ''}`}
                            disabled={loading}
                        >
                            {loading && <Spin className="mr-2" indicator={<div className="ant-spin-dot"><i></i><i></i><i></i><i></i></div>} />}
                            {loading ? 'Processing...' : 'Reset Password'}
                        </button>
                        
                    </div>
                )}
                              <p className="text-xs text-center mt-5 text-red-500 mb-4 flex items-center justify-center">
    <i className="fas fa-exclamation-triangle mr-2"></i>
    Don’t close this window until you reset your password.
</p>

            </motion.div>
        </Modal>
    );
};

export default ForgotPasswordModal;
