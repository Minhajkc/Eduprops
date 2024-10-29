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

  export const sendChatMessage = async (message) => {
    try {
    const response = await MentorInstance.post('/mentorchat', message, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
      return response.data; // Return response data
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error; // Propagate the error
    }
  };
  

export const retrieveMentorChats = async () => {
    try {
        const response = await MentorInstance.get(`/chats`, { withCredentials: true });
        return response.data; // Return response data
    } catch (error) {
        console.error('Error retrieving chat messages:', error);
        throw error; // Propagate the error
    }
};



export const scheduleMeeting = async (courseId, meetingData) => {
  try {
    const response = await MentorInstance.post(`/scheduleMeeting/${courseId}`, meetingData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    showToastSuccess(response.data.message)
    return response.data;
  } catch (error) {
   
    throw new Error(error.response ? error.response.data.message : 'Error scheduling meeting');
  }
};

export const fetchScheduledMeets = async (courseId) => {
  try {
    const response = await MentorInstance.get(`/scheduledMeets/${courseId}`);
    return {
      success: true,
      meets: response.data.meets, // Array of scheduled meetings
    };
  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data.message : 'Error fetching scheduled meetings',
    };
  }
};
export const updateMeeting = async (courseId, meetingId, updatedData) => {
  try {
    const response = await MentorInstance.put(`/course/${courseId}/meeting/${meetingId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    showToastSuccess(response.data.message)
    return response.data;
  } catch (error) {
    showToastError(error);
    console.error('Error updating meeting:', error);
    throw error;
  }
};

export const deleteMeeting = async (courseId, meetingId) => {

  try {
    const response = await MentorInstance.delete(`/course/${courseId}/meeting/${meetingId}`);
    showToastSuccess(response.data.message)
    return response.data;
  } catch (error) {
    showToastError(error);
    console.error('Error deleting meeting:', error);
    throw error;
  }
};

export const fetchStudentsByCourse = async () => {
  try {
    const response = await MentorInstance.get('/students/mystudents'); // Assuming the courseId is inferred from mentor
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error; // Re-throw error for handling in the component
  }
};

export const fetchCourseDetails = async (courseId) => {
  try {
    const response = await MentorInstance.get(`/getCourseDetailsMentor`, {
      params: { courseId }, 
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (e) {
    console.error('Error fetching course details:', e);
  }
};


export const addVideoToCourse = async (courseId, videoData) => {

  try {
      const response = await MentorInstance.put(`/addVideo/${courseId}`, videoData, {
          headers: {
              "Content-Type": "multipart/form-data",  
          },
      });
      showToastSuccess(`Video added successfully!`);
      return response.data;
  } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding video';
      showToastError(errorMessage);
      throw new Error(errorMessage);
  }
};

export const deleteCourseLesson = async (courseId, lessonIndex) => {
  console.log(courseId,lessonIndex,'this is delete')
  try {
      const response = await MentorInstance.delete(`/courses/${courseId}/lessons/${lessonIndex}`);
      showToastSuccess(response.message || 'Lesson deleted successfully');
      return response.data;
  } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error deleting lesson';
      showToastError(errorMessage);
      throw new Error(errorMessage);
  }
};


export const updateLesson = async (courseId, lessonId, updatedData) => {
  try {
    const response = await MentorInstance.put(`/courses/${courseId}/lessons/${lessonId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    showToastSuccess('Lesson updated successfully!');
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error('Error updating lesson:', error);
    throw error; // Rethrow to handle it in the component
  }
};


export const editLessonVideo = async (courseId, lessonId, formData) => {
  const response = await MentorInstance.put(`/editVideo/${courseId}/${lessonId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  showToastSuccess('Lesson updated successfully!');
  return response.data; // Return the response data from the server
};