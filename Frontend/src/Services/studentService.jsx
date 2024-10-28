import { StudentInstance } from '../Services/apiInstances';
import { showToastSuccess, showToastError, showToastInfo } from '../utils/toastify';
import { setStudentId } from '../Redux/studentSlice';



// POST request for login
export const loginStudent = async (formData, navigate) => {
    try {
        const response = await StudentInstance.post('/login', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        showToastSuccess('Login successful!');
        navigate('/'); 
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

export const handleGoogleAuth = async (response, navigate,dispatch) => {
 
    try {
        const result = await StudentInstance.post('/auth/google', {
            idToken: response.credential,
        });
        console.log(result,'m new')
        showToastSuccess('Sign-up successful!');
        navigate('/'); 
        const studentId = result.data.Student._id;
        const membershipType =result.data.Student.membershipType
        localStorage.setItem('studentId', studentId);
        localStorage.setItem('membershipType', membershipType)
        dispatch(setStudentId({studentId,membershipType}));
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
        
        throw error;
    }
};


export const getCourseCategory = async () =>{

    try {
        const response = await StudentInstance.get('/courses/categories');
        return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching categories';
            showToastError(errorMessage);
            throw new Error(errorMessage);
        }
}

export const getCategoryCoursesById = async (id) =>{
 
    try {
        const response = await StudentInstance.get(`/courses/category/${id}`)
            return response.data;
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Error fetching category';
                toast.error(errorMessage); // Show error toast notification
                throw new Error(errorMessage);
     }

}

export const getCourseById = async (courseId) =>{
    try {
        const response = await StudentInstance.get(`/courses/category/selectedcourse/${courseId}`)
       
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const logoutStudent = async () => {
    try {
    const response = await StudentInstance.post('/student/logout');
    showToastSuccess(response.message||'Logout Successful');
    return response.data;
   
    } catch (error) {
        console.log(error)
    }
};
export const getCartItems = async () =>{
    try {
        const response = await StudentInstance.get(`/cart`)
        return response.data;
        }
        catch(err){
            console.log(err);
            }
}

export const addCourseToCart = async (id) => {
    try {
        const response = await StudentInstance.post(`/cart/${id}`);
        showToastSuccess('Course added to cart successfully');
        console.log(response.data)
        return response.data;

    } catch (err) {
        if (err.response) {
            const statusCode = err.response.status;
            if (statusCode === 400) {
                showToastError('Course is already in the cart');
            } else if (statusCode === 404) {
                showToastError('Please Login and try again !');
            } else if(statusCode === 409){
                showToastError('You have already purchased this course');
            }else {
                showToastError('Please Login and try again !');
              
            }
        } else if (err.request) {
            showToastError('No response from server, please try again later');
        } else {
            showToastError('An unexpected error occurred');
        }

        console.log(err); // For debugging purposes
    }
};

export const removeFromCart = async (id) => {
    try {
      const response = await StudentInstance.delete(`/removeFromCart/${id}`);
      showToastSuccess('Course removed successfully');
      return response.data;
    } catch (error) {
      console.error('Error removing course:', error);
      showToastError('Failed to remove the course. Please try again.');
      throw error; // Rethrow the error so it can be handled in handleRemove
    }
  };

  export const handleRazorpayPayment = async ({ cartData }) => {
    try {
      const { total } = cartData;
      
      // Create an order by sending a request to the backend
      const response = await StudentInstance.post('/createOrder', {
        amount: total, // Amount from the cart data
        currency: 'INR', // Setting currency to INR
      });
  
      return response.data; // Return the order data (including order_id)
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error; 
    }
  }

export const verifyRazorPayPayment = async ({ order_id, payment_id, signature }) => {
  try {
  
    const response = await StudentInstance.post('/verifyPayment', {
      order_id,
      payment_id,
      signature
    });
    return response.data; 
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error; // Rethrow error to handle it in the calling function
  }
}

export const savePurchase = async ({ cartData}) => {
    try {

      const response = await StudentInstance.post('/savePurchase', {
        cartData,   
      });
      console.log(response,'jisisis')
      return response.data;
    } catch (error) {
      console.error('Error saving purchase:', error);
      throw error; // Rethrow error to handle it in the calling function
    }
  };

  export const searchCourseCategory = async (searchTerm) => {
    try {
      const response = await StudentInstance.get(`/categories/search`, {
        params: { searchTerm },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching categories:', error);
      throw error;
    }
  }

  export const getCategoryCoursesByIdSort = async (categoryId, searchTerm = '', sortOption = 'price-asc') => {
    console.log(searchTerm,'search')
    try {
      const response = await StudentInstance.get(`/category/${categoryId}/courses`, {
        params: {
          searchTerm,
          sortOption,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  };
  

  export const fetchMentors = async () => {
    try {
      const response = await StudentInstance.get(`/mentorCarousel`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mentors:', error);
      throw error; // Propagate the error to be handled by the calling component
    }
  };



export const handleRazorpayPaymentSubscription = async ({ amount, currency }) => {
  try {
    const total = amount;
    
    // Create an order by sending a request to the backend
    const response = await StudentInstance.post('/createOrderSubscription', {
      amount: total, // Amount from the cart data
      currency: 'INR', // Setting currency to INR
    });

    console.log(response);

    return response.data; // Return the order data (including order_id)
  } catch (error) {
    // Handling error and displaying a custom message
    const errorMessage = error.message || 'Failed to create the order. Please try again.';
    showToastError(errorMessage); // Show the error message using Toastify

    console.error('Error creating Razorpay order:', error);

    throw error; // Rethrow the error to handle it in the calling function
  }
};


export const verifyRazorPayPaymentSubscription = async ({ order_id, payment_id, signature }) => {
  try {
  
    const response = await StudentInstance.post('/verifyPaymentSubscription', {
      order_id,
      payment_id,
      signature
    });
    return response.data; 
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error; // Rethrow error to handle it in the calling function
  }
}

export const savePurchaseSubscription = async ({ subscriptionPlan}) => {
    try {

      const response = await StudentInstance.post('/savePurchaseSubscription', {
        subscriptionPlan  
      });
      return response.data;
    } catch (error) {
      console.error('Error saving purchase:', error);
      throw error; // Rethrow error to handle it in the calling function
    }
  };


  export const fetchAds = async () => {
    try {
      const response = await StudentInstance.get('/ads');
      return response.data;
    } catch (error) {
      console.error('Error fetching ads:', error);
      throw error;
    }
  };



  export const sendChatMessage = async (courseId, message) => {
    try {
        const response = await StudentInstance.post(`/courses/${courseId}/chat`, { message }, { withCredentials: true });
        return response.data; // Return response data
    } catch (error) {
        console.error('Error sending chat message:', error);
        throw error; // Propagate the error
    }
};

export const retrieveChatMessages = async (courseId) => {
    try {
        const response = await StudentInstance.get(`/courses/${courseId}/chat`, { withCredentials: true });
        return response.data; // Return response data
    } catch (error) {
        console.error('Error retrieving chat messages:', error);
        throw error; // Propagate the error
    }
};

export const addReview = async (reviewdata) =>{
  
  try {
   
    const response = await StudentInstance.post('/review',{reviewdata})
    showToastSuccess(response.data.message)
    return response.data
    } catch (error) {
      showToastError(error.message)
      console.error('Error adding review:', error);
      throw error;
      }
}

export const fetchReviews = async () => {
  try {
    const response = await StudentInstance.get('/reviews');

    return response.data; // Assuming the API returns the data in the response
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const emailSubscription = async (email) => {
  if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    showToastError('Invalid email format');
    return;
  }

  try {
    const response = await StudentInstance.post('/subscribe', { email });
    
    if (response.status === 200) {
      showToastSuccess(response.data.message || 'Subscribed successfully!');
    } else {
      showToastError(response.data.message || 'Failed to subscribe.');
    }
    
    return response;
  } catch (error) {
    showToastError(error.response?.data?.message || 'Error subscribing to email');
    console.error('Error subscribing to email:', error);
    throw error;
  }
};


export const submitContactForm = async (formData) => {
  try {
    const response = await StudentInstance.post('/contact', formData); // Adjust the endpoint as needed

    return response.data; // Assuming the API returns the data in the response
  } catch (error) {
    console.error('Error submitting contact form:', error);

    // You can throw a custom error message or structure it based on the error response
    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(error.response.data.message || 'An error occurred while submitting the form.');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from the server. Please try again later.');
    } else {
      // Something else caused the error
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};
