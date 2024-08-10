import { AdminInstance } from '../Services/apiInstances'
import { showToastSuccess, showToastError, showToastWarning } from '../utils/toastify'

export const AdminLogin = async (formData) => {
    try {
      const response = await AdminInstance.post('login', formData, {
      });      
      showToastSuccess('Login successful !');
      return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message || ('Error logging in. Please try again.');
        showToastError(errorMessage)
    }
  };
  