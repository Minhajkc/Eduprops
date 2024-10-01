import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { CheckCircleOutlined, PhoneOutlined } from '@ant-design/icons';

const PhoneNumberVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerifyPhone = () => {
    setLoading(true);

    // Simulate phone number verification process
    setTimeout(() => {
      if (phoneNumber.length === 10) {
        setIsVerified(true);
        message.success('Phone number verified successfully!');
      } else {
        message.error('Invalid phone number! Please enter a valid 10-digit number.');
        setIsVerified(false);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Your Phone Number</h2>
      <div className="flex items-center justify-between w-full">
        <Input
          size="large"
          placeholder="Enter your phone number"
          prefix={<PhoneOutlined />}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          maxLength={10}
          className="w-3/4"
        />
        <Button
          type="primary"
          size="large"
          onClick={handleVerifyPhone}
          loading={loading}
          className="ml-4"
        >
          Verify
        </Button>
      </div>
      {isVerified && (
        <div className="mt-4 text-green-500 flex items-center">
          <CheckCircleOutlined className="mr-2" />
          <span>Your phone number is verified!</span>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberVerification;
