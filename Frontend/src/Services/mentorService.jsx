import { MentorInstance } from '../Services/apiInstances';
import { showToastSuccess, showToastError } from '../utils/toastify';


export const registerMentor = async (formData) => {  
      console.log(formData,'ffffffffff');
    try {
     
        const response = await MentorInstance.post('MentorRegister', formData, {
        });
     
        console.log(response, 'resss');
         
        if (response.data && response.data.message) {
            showToastSuccess(response.data.message);
        } else {
            showToastSuccess('Mentor registered successfully!');
        }

        return response.data; 

    } catch (error) {
        // Handle error response and fallback message
        const errorMessage = error.response?.data?.message || 'An error occurred during registration.';
        showToastError(errorMessage);
        throw error; // Rethrow the error to allow further handling if needed
    }
};
