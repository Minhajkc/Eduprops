import React from 'react';
import { Modal, Button, Typography, Space, List, Alert } from 'antd';
import { CreditCardOutlined, CheckOutlined } from '@ant-design/icons';
import { handleRazorpayPaymentSubscription,verifyRazorPayPaymentSubscription,savePurchaseSubscription} from '../../../Services/studentService';
import { showToastSuccess, showToastError } from '../../../utils/toastify'
import { useNavigate,Link } from 'react-router-dom';
import { setStudentId } from '../../../Redux/studentSlice';
import { useDispatch } from 'react-redux';

const { Title, Text } = Typography;

const SubscriptionModal =  ({ isOpen, onClose, planDetails }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            const subscriptionPlan = planDetails.name;
            const amount = planDetails.rate; // Ensure this is the numeric amount
            const currency = 'INR';

            const response = await handleRazorpayPaymentSubscription({amount,currency});
           const { id, amount: orderAmount } = response // `id` is the order_id from backend
        
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
                const verifyResponse = await verifyRazorPayPaymentSubscription({
                  order_id: razorpay_order_id,
                  payment_id: razorpay_payment_id,
                  signature: razorpay_signature,
                });
        
                if (verifyResponse.status === 'success') {
                  const purchaseResponse = await savePurchaseSubscription({
                    subscriptionPlan
                  });
                  const membershipType = purchaseResponse.membershipType
      
                  if (purchaseResponse.status === 'success') {
                    showToastSuccess('Payment Successful!');
                    dispatch(setStudentId({membershipType}));
                    localStorage.setItem('membershipType', membershipType)
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


    const planName = planDetails?.name || 'Unknown';
    const planRate = planDetails?.rate || 'N/A';

    const themeColor = planName.toLowerCase() === 'platinum' ? '#722ED1' : '#FAAD14';

    const features = [
        'Exclusive content access',
        'Premium features',
        'Priority support'
    ];

    return (
        <Modal
            visible={isOpen}
            onCancel={onClose}
            footer={null}
            width={400}
            bodyStyle={{ padding: '24px' }}
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={3} style={{ color: themeColor, marginBottom: 0 }}>
                    {planName.charAt(0).toUpperCase() + planName.slice(1)} Plan
                </Title>

                <div style={{ 
                    background: planName.toLowerCase() === 'platinum' ? '#F9F0FF' : '#FFFBE6',
                    border: `1px solid ${themeColor}`,
                    borderRadius: '8px',
                    padding: '16px'
                }}>
                    <Space align="center">
                        <CreditCardOutlined style={{ fontSize: '24px', color: themeColor }} />
                        <Title level={4} style={{ color: themeColor, margin: 0 }}>
                            {planRate}
                        </Title>
                    </Space>

                    <List
                        itemLayout="horizontal"
                        dataSource={features}
                        renderItem={(item) => (
                            <List.Item>
                                <Space>
                                    <CheckOutlined style={{ color: '#52C41A' }} />
                                    <Text>{item}</Text>
                                </Space>
                            </List.Item>
                        )}
                        style={{ marginTop: '16px' }}
                    />
                </div>

                <Alert
                    message="Please review the plan details before proceeding with the payment."
                    type="info"
                    showIcon
                />

                <Button type="primary" onClick={handlePayment} block style={{ height: '40px', backgroundColor: themeColor }}>
                    Proceed to Payment
                </Button>
            </Space>
        </Modal>
    );
};

export default SubscriptionModal;