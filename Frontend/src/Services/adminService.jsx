import { AdminInstance } from '../Services/apiInstances';
import { showToastSuccess, showToastError } from '../utils/toastify';


export const AdminLogin = async (formData, navigate) => {
  try {
    const response = await AdminInstance.post('login', formData);
    navigate('/admin/dashboard');
    showToastSuccess('Login successful!');
    console.log('navigated form');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error logging in. Please try again.';
    showToastError(errorMessage);
  }
};


export const AdminLogout = async (navigate) => {
    try {
      const response = await AdminInstance.post('logout');
      showToastSuccess('Logged out successfully!');
      navigate('/admin/login');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error logging out. Please try again.';
      showToastError(errorMessage);
    }
  };

  export const AuthStudent = async ()=>{
    try {
      
        const response = await AdminInstance.get('StudentsAuth', {
        });
        return response.data; 
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching student data';
        showToastError(errorMessage);
        throw new Error(errorMessage); // Optionally, rethrow the error for further handling
      }

  }
  export const blockStudentById = async (studentId) => {
    const response = await AdminInstance.post(`Students/${studentId}/block`);
    return response.data;
  };

  export const unblockStudentById = async (studentId) => {
    const response = await AdminInstance.post(`Students/${studentId}/unblock`);
    return response.data;
  };


export const GetMentors = async () =>{
    try {
        const response = await AdminInstance.get('Mentorauth',{
            });
            return response;
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Error fetching mentor data';
                showToastError(errorMessage);
                throw new Error(errorMessage); // Optionally, rethrow the error for further handling
                }
                }
