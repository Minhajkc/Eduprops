// src/components/OtpModal.jsx
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Spin } from 'antd';

Modal.setAppElement('#root');

const OtpModal = ({ isOpen, onClose, formData }) => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [timeLeft, setTimeLeft] = useState(300); 
    const [loading, setLoading] = useState(false);// 5 minutes in seconds
    const inputsRef = useRef([]);

    useEffect(() => {
        if (isOpen) {
            setOtp(Array(6).fill('')); 
            setTimeLeft(300); // Reset the countdown when modal opens

            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer); // Clean up timer on unmount
        }
    }, [isOpen]);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            if (index < 5) {
                inputsRef.current[index + 1]?.focus(); 
            }
        } else if (value === '') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            
            if (index > 0) {
                inputsRef.current[index - 1]?.focus(); 
            }
        }
    };
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading spinner
        try {
            const otpValue = otp.join('');
            const response = await axios.post('http://localhost:3000/verify', {
                email: formData.email,
                otp: otpValue,
                password: formData.password, 
                confirmPassword: formData.confirmPassword,
                username: formData.username
            }, {
                withCredentials:true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setLoading(false); 
             navigate('/')
            toast.success('Account created successfully!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
            });
            onClose(); 
        } catch (error) {
            setLoading(false); 
            toast.error(error.response?.data?.message || 'Error verifying OTP.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
            });
        }
    };
    

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Enter OTP"
            className="flex items-center mt-20 font-roboto justify-center p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white rounded-3xl shadow-lg p-6 max-w-sm mx-auto w-full border-4 border-custom-cyan2">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-4">Enter OTP</h2>
                <p className="text-sm text-center text-gray-600 mb-4">
                    OTP has been sent to your email.{formData.email}
                </p>
                <p className="text-sm text-center text-gray-600 mb-4">
                    OTP expires in {formatTime(timeLeft)}
                </p>
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <div className="grid grid-cols-6 gap-2">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                value={value}
                                onChange={(e) => handleOtpChange(e, index)}
                                maxLength={1}
                                ref={el => inputsRef.current[index] = el}
                                className="text-center border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-cyan1"
                                placeholder="0"
                            />
                        ))}
                    </div>
                    <button
    type="submit"
    className={`w-full bg-custom-cyan text-white p-2 rounded-lg hover:bg-cyan-500 flex items-center justify-center ${loading ? 'opacity-60' : ''}`}
    disabled={loading}
>
    {loading && <Spin className="mr-2" indicator={<div className="ant-spin-dot"><i></i><i></i><i></i><i></i></div>} />}
    {loading ? 'Processing...' : 'Verify OTP'}
</button>

                </form>
                <button 
                    onClick={onClose} 
                    className="w-full mt-2 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Close
                </button>
                <p className="text-xs text-center mt-5 text-yellow-500 mb-4">
    DO not close this window until you have entered the OTP.
</p>


            </div>
            
        </Modal>
    );
};

export default OtpModal;
