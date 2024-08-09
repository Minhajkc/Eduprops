import { StudentInstance } from '../Services/apiInstances'
import { showToastSuccess, showToastError, showToastWarning } from '../utils/toastify'

// POST request for login
export const loginStudent = async (formData) => {
    try {
        const response = await StudentInstance.post('/login', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        showToastSuccess('Login successful!');
        return response;
    } catch (error) {
        console.log(error);
         const errorMessage = error.response?.data?.message || ('Error logging in. Please try again.');
         showToastError(errorMessage)
        throw error;
    }
};

// POST request for registration
export const registerStudent = async (formData) => {
    
    try {
        const response = await StudentInstance.post('/register', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        showToastSuccess('OTP sent to email!');
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error sending OTP.';
        showToastError(errorMessage);
        throw error;
    }
};


export const handleGoogleAuth = async (response) => {
  try {
    const result = await StudentInstance.post('/auth/google', {
      idToken: response.credential,
    });
    showToastSuccess('Sign-up successful!');
    return result;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error signing up with Google.';
    showToastError(errorMessage);
    throw error;
  }
};