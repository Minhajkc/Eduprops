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
      navigate('/admin');
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

 export const ApproveMentor = async (mentorId) => {
    try {
        const response = await AdminInstance.patch(`Mentorauth/${mentorId}/approve`);
        showToastSuccess('Mentor approved successfully!');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error approving mentor';
        showToastError(errorMessage);
        throw new Error(errorMessage); 
    }
};


export const RejectMentor = async (mentorId) => {
    try {
        const response = await AdminInstance.patch(`Mentorauth/${mentorId}/reject`);
        showToastSuccess('Mentor Rejected successfully!');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error rejecting mentor';
        showToastError(errorMessage);
        throw new Error(errorMessage); 
    }
}

export const createCourseCategory = async (name, description,icon) => {
    try {
        const response = await AdminInstance.post('/categories', { name, description,icon});
        showToastSuccess('Category added successfully!');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error adding category';
        showToastError(errorMessage);
        throw new Error(errorMessage);
    }
};

export const getCourseCategory = async () =>{

    try {
        const response = await AdminInstance.get('categories');
        return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching categories';
            showToastError(errorMessage);
            throw new Error(errorMessage);
        }
}


export const addCourse = async (courseData) =>{

    try {
        const response = await AdminInstance.post('/courses', courseData);
        showToastSuccess('Course added successfully!');
        return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error adding course';
            showToastError(errorMessage);
            throw new Error(errorMessage);
        }
}


export const getAllCourses = async () => {
    try {
        const response = await AdminInstance.get('/courses');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching courses';
        toast.error(errorMessage); // Show error toast notification
        throw new Error(errorMessage);
    }
};

export const getCoursesById = async () => {
    try {
        const response = await AdminInstance.get('/coursesById');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching courses';
        toast.error(errorMessage); 
        throw new Error(errorMessage);
    }
};

export const deleteCategory = async (id) =>{
    try {
        const response = await AdminInstance.delete(`/categories/${id}`)

        showToastSuccess( response.data.message);
            return response.data;
         
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Error deleting category';
                toast.error(errorMessage); // Show error toast notification
                throw new Error(errorMessage);
     }
}

export const editCategory = async (id, updatedCategory) => {
    try {
        const response = await AdminInstance.put(`/categories/${id}`, updatedCategory);
        showToastSuccess(`Category updated successfully! ${response.data.name}  `);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error editing category';
        showToastError(errorMessage); 
        throw new Error(errorMessage);
    }
};


export const getCategoryById = async (id) =>{
    try {
        const response = await AdminInstance.get(`/courses/${id}`)
            return response.data;
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Error fetching category';
                toast.error(errorMessage); // Show error toast notification
                throw new Error(errorMessage);
     }

}

export const deleteCourseById = async (id) =>{
    try {
        const response = await AdminInstance.delete(`/courses/${id}`)
        showToastSuccess( response.data.message);
        return response.data;
    }catch(error){
        const errorMessage = error.response?.data?.message || 'Error deleting course';
        toast.error(errorMessage); // Show error toast notification
    }
}

export const getCourseById = async (id) =>{
    try {
        const response = await AdminInstance.get(`/getCoursebyId/${id}`)
            return response.data;
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Error fetching category';
                toast.error(errorMessage); // Show error toast notification
                throw new Error(errorMessage);
     }

}

export const updateCourse = async (id, updatedCourseData) => {
    try {
  
        const response = await AdminInstance.put(`/updateCourse/${id}`, updatedCourseData, {
            headers: {
                "Content-Type": "multipart/form-data",  
            },
        });
        showToastSuccess('Course updated successfully!');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error updating course';
        throw new Error(errorMessage);
    }
}

export const addVideoToCourse = async (courseId, videoData) => {

    try {
        const response = await AdminInstance.put(`/addVideo/${courseId}`, videoData, {
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
  
    try {
        const response = await AdminInstance.delete(`/courses/${courseId}/lessons/${lessonIndex}`);
        showToastSuccess(response.message || 'Lesson deleted successfully');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error deleting lesson';
        showToastError(errorMessage);
        throw new Error(errorMessage);
    }
};

export const coursedetailsmentor = async () => {

    try {
        const response = await AdminInstance.get('/coursedetailsmentor');
        console.log(response);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching course details';
        showToastError(errorMessage);
        throw new Error(errorMessage);
    }
};


export const editLessonVideo = async (courseId, lessonId, formData) => {
 
    try {
        const response = await AdminInstance.put(`/editVideo/${courseId}/${lessonId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        showToastSuccess(`Video updated successfully!`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error editing lesson video';
        showToastError(errorMessage);
        throw new Error(errorMessage);
    }
};


export const fetchAdminSettings = async () => {
    try {
        const response = await AdminInstance.get('/settings');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching settings';
        showToastError(errorMessage);
        throw new Error(errorMessage);
    }
};

// Update settings function
export const updateAdminSettings = async (formData) => {
    try {
        const response = await AdminInstance.put('/settings', formData);
        showToastSuccess('Settings updated successfully!');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error updating settings';
        showToastError(errorMessage);
        throw new Error(errorMessage);
    }
};

export const updateSubscriptionRates = async (rates) => {
    try {
      const response = await AdminInstance.post('/subscription/update-rates', rates);
      showToastSuccess('Subscription rates updated successfully!');
      return response.data;
    } catch (error) {
        showToastError('Failed to update rates')
      console.error('Error updating subscription rates:', error);
      throw error;
    }
  };


  export const fetchSubscriptionRates = async () => {
    try {
      const response = await AdminInstance.get('/get-rates-subscription'); // Adjust the endpoint if necessary
      return response.data; // Returns the rates: { goldRate, platinumRate }
    } catch (error) {
      console.error('Error fetching subscription rates:', error);
      throw error;
    }
  }


  export const fetchAds = async () => {
    const response = await AdminInstance.get('/ads');
    return response.data;
  };

  export const createAd = async (adData) => {
    const response = await AdminInstance.post('/ads', adData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for multipart form data
      },
    });
    showToastSuccess('Added New Ads successfully!');
    return response.data;
  };
  

  export const updateAd = async (id, adData) => {
    const response = await AdminInstance.put(`${'/ads'}/${id}`, adData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for multipart form data
      },
    });
    showToastSuccess('Ads updated successfully!');
    return response.data;
  };
  
  
  // Function to delete an ad
  export const deleteAd = async (id) => {
    await AdminInstance.delete(`${'/ads'}/${id}`);
    showToastSuccess('Deleted successfully!');
  };

  export const setCourseInstructor = async (courseId, mentorId) => {
    try {
      const response = await AdminInstance.put(`/courses/${courseId}/instructor`, {
        mentorId,
      });
      showToastSuccess('Instructor assigned successfully and mentor updated');
      return response.data;
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with a status other than 2xx
        const errorMessage = error.response.data.message || 'Error updating course instructor';
        showToastError(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        showToastError('No response received from the server');
      } else {
        // Something else happened while setting up the request
        showToastError('Error updating course instructor: ' + error.message);
      }
      throw error; // Re-throw the error for further handling if needed
    }
  };

  export const editLessonVideos = async (courseId, lessonId, formData) => {
    const response = await AdminInstance.put(`/editVideo/admin/${courseId}/${lessonId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    showToastSuccess('Lesson updated successfully!');
    return response.data; // Return the response data from the server
  };

  export const updateLesson = async (courseId, lessonId, updatedData) => {
    try {
      const response = await AdminInstance.put(`/courses/admin/${courseId}/lessons/${lessonId}`, updatedData, {
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

  export const getDashboardMetrics = async () => {
    try {
      const response = await AdminInstance.get('/dashboard-metrics');
      return response; 
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw error; // Re-throw to handle it in the component
    }
  };
  