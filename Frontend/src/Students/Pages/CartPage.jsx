import  { useState, useEffect } from 'react';
import { getCartItems, removeFromCart,handleRazorpayPayment,verifyRazorPayPayment,savePurchase} from '../../Services/studentService'; 
import { showToastSuccess, showToastError } from '../../utils/toastify';
import { Trash2 } from 'lucide-react';
import { useNavigate,Link } from 'react-router-dom';
import { CiClock2 } from "react-icons/ci";
import { Modal, Button } from 'antd';
import Footer from '../Components/Layout/Footer';
import {  Spin } from 'antd';



const CartPage = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState({
    items: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        const { courses, subtotal, discount, tax, total } = response;
        setCartData({ items: courses, subtotal, discount, tax, total });
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        setError('Failed to fetch cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (itemToRemoveId) => {
    setLoading(true);
    try {
      await removeFromCart(itemToRemoveId);
      const response = await getCartItems();
      const { courses, subtotal, discount, tax, total } = response;
      setCartData({ items: courses, subtotal, discount, tax, total });
    } catch (error) {
      console.log('Failed to remove course:', error);
    }finally {
      setLoading(false); // Set loading to false after the operation completes
    }
  };

  const handleClick = (id) => {
    navigate(`/courses/category/selectedcourse/${id}`);
  };


    
  const showModal = () => {
    setIsModalVisible(true);  // Show the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Hide the modal
  };


  const handleCheckout = async () => {
    try {
      const response = await handleRazorpayPayment({ cartData });
      const { id, amount } = response; // `id` is the order_id from backend
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay API Key
        amount: amount, // Razorpay expects the amount in paise
        currency: 'INR',
        order_id: id,  // Pass the order_id received from the backend
        name: 'Eduprops', // Custom name to display
        description: 'Order #1234', // Custom description for the order
        image: 'https://yourdomain.com/logo.png', // Optional logo URL
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          const verifyResponse = await verifyRazorPayPayment({
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            signature: razorpay_signature,
          });
  
          if (verifyResponse.status === 'success') {
            const purchaseResponse = await savePurchase({
              cartData: cartData.items, 
            });

            if (purchaseResponse.status === 'success') {
              showToastSuccess('Payment Successful!');
              navigate('/profile'); 
            } else {
              showToastError('Failed to save purchase details');
            }
          } else {
            showToastError('Payment Verification Failed');
          }
        },
        theme: {
          color: '#3399cc', // Custom theme color
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };
  
  if (loading) {
    
    return <div className="flex items-center justify-center h-screen ">
    <Spin  size='large'/>;
</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500 font-semibold">{error}</div>;
  }

  const { items, subtotal, discount, tax, total } = cartData;

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-roboto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="text-sm text-gray-500 mb-6">
        {items.length} {items.length === 1 ? 'Course' : 'Courses'} in cart
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-gray-700 mb-4">Your cart is empty.</p>
          <Link
            to={`/courses`}
            className="bg-custom-cyan text-white py-2 px-5 rounded-md hover:bg-custom-cyan2 transition duration-150 ease-in-out"
          
            Browse Courses>
              Explore Courses
            </Link>
            

        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-4 py-6 lg:p-5 rounded-md border-b border-gray-200 last:border-b-0 hover:bg-slate-100 duration-300 cursor-pointer"
                onClick={() => handleClick(item._id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-16 object-cover rounded-md shadow-sm"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-xs text-gray-700 flex items-center">
                    <CiClock2 className="mr-1" />
                    {item.duration} Hours
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-lg text-gray-800">₹{item.price.toFixed(2)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the click from bubbling up to the parent div
                      handleRemove(item._id);
                    }}
                    className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out mt-2 focus:outline-none"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="font-bold text-xl text-gray-800 mb-4">Cart Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>{tax}%</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-800 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="w-full bg-custom-cyan text-white py-3 rounded-md mt-6 hover:bg-custom-cyan2 transition duration-150 ease-in-out focus:outline-none focus:ring-offset-2 focus:ring-custom-cyan"
                onClick={showModal}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Order Summary "
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Custom footer to add Checkout button
      >
        <div className="space-y-3 font-roboto">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Estimated Tax</span>
            <span>{tax}%</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-gray-800 pt-3 border-t border-gray-200">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
        <Button
          type="primary"
          onClick={handleCheckout}
          className="mt-4 w-full p-5 bg-custom-cyan"
        >
          Continue To Pay <span className='font-bold'>₹{total.toFixed(2)}</span>
        </Button>
      </Modal>
      <Footer/>
    </div>
  );
};

export default CartPage;
