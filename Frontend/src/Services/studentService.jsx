import { StudentInstance } from '../Services/apiInstances';
import { showToastSuccess, showToastError } from '../utils/toastify';

// POST request for login
export const loginStudent = async (formData, navigate) => {
    try {
        const response = await StudentInstance.post('/login', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        showToastSuccess('Login successful!');
        navigate('/'); // Navigate to the home page
        return response;
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Error logging in. Please try again.';
        showToastError(errorMessage);
        throw error;
    }
};

// POST request for registration
export const registerStudent = async (formData, navigate) => {
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

export const handleGoogleAuth = async (response, navigate) => {
    try {
        const result = await StudentInstance.post('/auth/google', {
            idToken: response.credential,
        });
        showToastSuccess('Sign-up successful!');
        navigate('/'); // Navigate to the home page
        return result;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error signing up with Google.';
        showToastError(errorMessage);
        throw error;
    }
};

// POST request for sending OTP (password reset)
export const sendPasswordResetOtp = async (email) => {
    try {
        const response = await StudentInstance.post('/password-reset/send-otp', { email }, {
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
        const response = await StudentInstance.post('/password-reset/verify-otp', { email, otp }, {
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
        const response = await StudentInstance.post('/password-reset/reset-password', { email, newPassword }, {
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


export const fetchStudentProfile = async () => {
    try {
        const response = await StudentInstance.get('/profile', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Error fetching profile. Please try again.';
        showToastError(errorMessage);
        throw error;
    }
};



