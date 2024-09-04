import React, { useState, useEffect } from 'react';
import { getCartItems } from '../../Services/studentService'; 
import { Star, Trash2 } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        setCartItems(response);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        setError('Failed to fetch cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = (itemToRemove) => {
    setCartItems(cartItems.filter(item => item.id !== itemToRemove.id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = 10; // Hardcoded for now, adjust as needed
  const tax = 20; // Hardcoded for now, adjust as needed
  const total = subtotal - discount + tax;

  if (loading) {
    return <div className="p-6 text-center">Loading cart items...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="lg:p-10 p-6 mx-auto font-roboto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="text-sm text-gray-600 mb-4">{cartItems.length} Course in cart</div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-grow  ">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 pb-4 mb-4 border-b">
              <img src={item.image} alt={item.title} className="w-24 h-16 object-cover rounded" />
              <div className="flex-grow">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">By {item.author}</p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400 mr-1">{item.rating?.toFixed(1)}</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < Math.floor(item.rating || 0) ? "gold" : "none"} stroke="gold" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({item.ratingCount} ratings)</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.totalHours} Total Hours, {item.lectureCount} Lectures, All levels</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold">${item.price.toFixed(2)}</span>
                <button onClick={() => handleRemove(item)} className="text-red-500 hover:text-red-700 mt-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="w-full md:w-64">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-bold mb-4">Order Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Price</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;