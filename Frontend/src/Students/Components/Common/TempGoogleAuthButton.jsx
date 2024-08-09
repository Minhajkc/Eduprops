import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuthButton = ({ onSuccess, onFailure }) => (
  <div className="w-full  rounded-lg flex items-center justify-center cursor-pointer">
  <GoogleLogin
     
    onSuccess={onSuccess}
    onFailure={onFailure}
  />
  </div>
);

export default GoogleAuthButton; 
