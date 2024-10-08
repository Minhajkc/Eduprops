import { MentorInstance } from '../Services/apiInstances';
import { showToastSuccess, showToastError } from '../utils/toastify';

export const registerMentor = async (formData) => {
    try {
      // Log FormData entries
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File - ${value.name}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }
  
      const response = await MentorInstance.post('MentorRegister', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
  
  
      if (response.data && response.data.message) {
        showToastSuccess(response.data.message);
      } else {
        showToastSuccess('Mentor registered successfully!');
      }
  
      return response.data;
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during registration.';
      showToastError(errorMessage);
      throw error; // Rethrow the error to allow further handling if needed
    }
  }
  ;
export const Login = async (formData, navigate) => {
    try {
        // Send a POST request to the login endpoint with formData
        const response = await MentorInstance.post('Login', formData,{
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(response, 'resss');

        if (response.data && response.data.message) {
            showToastSuccess(response.data.message);
            navigate('/mentor/dashboard');
        } else {
            // Handle unexpected response
            showToastError('Login failed. Please try again.');
        }

        return response.data; 
    } catch (error) {
        // Extract error message or use a default message
        const errorMessage = error.response?.data?.message || 'An error occurred during login.';
        showToastError(errorMessage);
        throw error; // Rethrow the error to allow further handling if needed
    }
};

export const sendPasswordResetOtp = async (email) => {
  
    try {
        const response = await MentorInstance.post('/password-reset/send-otp', { email }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        showToastSuccess('OTP sent to your email!');
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error sending OTP.';
        showToastError(errorMessage);
        throw error;
    }
};

// POST request for verifying OTP
export const verifyPasswordResetOtp = async (email, otp) => {
    try {
        const response = await MentorInstance.post('/password-reset/verify-otp', { email, otp }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        showToastSuccess('OTP verified!');
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
        showToastError(errorMessage);
        throw error;
    }
};


// POST request for resetting password
export const resetPassword = async (email, newPassword) => {
    try {
        const response = await MentorInstance.post('/password-reset/reset-password', { email, newPassword }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        showToastSuccess('Password reset successful!');
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error resetting password. Please try again.';
        showToastError(errorMessage);
        throw error;
    }
};

export const getProfile = async () => {
    try {
      const response = await MentorInstance.get('/Profile');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
 // Ensure showToastError is properly defined/imported
      throw error;
    }
  };

  export const logoutMentor = async () => {
    try {
      // Send logout request to the backend if necessary
      await MentorInstance.post('/logout');// or sessionStorage.removeItem('mentorToken')
      showToastSuccess('Logout successful!');
      return { message: 'Logout successful' };
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };


