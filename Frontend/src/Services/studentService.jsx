import { StudentInstance } from '../Services/apiInstances';
import { showToastSuccess, showToastError } from '../utils/toastify';
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
        localStorage.setItem('studentId', studentId);
        dispatch(setStudentId(studentId));
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


  export const handleRazorpayPaymentSubscription = async ({amount,currency} ) => {
    try {
      const  total  = amount;
      
      // Create an order by sending a request to the backend
      const response = await StudentInstance.post('/createOrderSubscription', {
        amount: total, // Amount from the cart data
        currency: 'INR', // Setting currency to INR
      });
  
      return response.data; // Return the order data (including order_id)
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error logging in. Please try again.';
        showToastError(errorMessage);
      console.error('Error creating Razorpay order:', error);
      throw error; 
    }
  }

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
      console.log(response,'jisisis')
      return response.data;
    } catch (error) {
      console.error('Error saving purchase:', error);
      throw error; // Rethrow error to handle it in the calling function
    }
  };

