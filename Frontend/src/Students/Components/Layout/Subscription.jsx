import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SubscriptionModal from '../Specific/SubscriptionModal';
import axios from 'axios'; // Assuming you're using axios for API requests
import { fetchSubscriptionRates } from '../../../Services/adminService';


const Subscription = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState({});
    const [currentRates, setCurrentRates] = useState({});
    const membershipType = useSelector((state) => state.student.membershipType || localStorage.getItem('membershipType'));
    const reduxStudentId = useSelector((state) => state.student.studentId||localStorage.getItem('studentId'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetchSubscriptionRates()
                setCurrentRates(response);
            } catch (error) {
                console.error('Error fetching subscription rates:', error);
            }
        };
        fetchRates();
    }, []);

    const handlePurchaseClick = (plan) => {
        if (!reduxStudentId) {
            navigate('/signup'); // Redirect to signup if there's no student ID
        } else {
            setSelectedPlan(plan);
            setIsModalOpen(true);
        }
    };



    return (
        <div className="bg-white py-12 font-roboto">
            <div className="max-w-7xl mx-auto text-center px-4">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    We create a monthly pricing package for all standard students
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                    Basically, we create this package for those who are really interested and benefit from our courses or books.
                    We aim to offer a low-cost package. This allows them to purchase any course with the package they choose from us.
                    Additionally, they will receive free books with each package.
                </p>
            </div>

            <div className="mt-12 max-w- mx-auto grid gap-8 p-5 lg:grid-cols-3 md:grid-cols-3 lg:max-w-7xl lg:px-8">

                {/* Silver Pack */}
                <div className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-[#C0C0C0]">
  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
    <div className="flex-1">
      <h1 className="mt-6 text-center text-3xl font-bold leading-6 text-[#C0C0C0] flex items-center justify-center">
        {/* Silver Icon */}
        <i className="fas fa-medal mx-2"></i> 
        Silver
      </h1>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">3 HD video lessons & tutorials</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">1 Official exam</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">100 Practice questions</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">1 Month subscription</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">1 Free book</span>
        </li>
        <li className="flex items-center text-red-500">
          <span className="ml-3 text-gray-700">No in-depth explanations</span>
        </li>
        <li className="flex items-center text-red-500">
          <span className="ml-3 text-gray-700">No personal instructor assistance</span>
        </li>
      </ul>
    </div>
    <div className="mt-6 text-center">
      {reduxStudentId ? (
        <p className="text-md font-bold p-2 rounded-md text-black">You are in {membershipType} membership</p>
      ) : (
        <button
          className="w-full bg-custom-cyan hover:bg-custom-cyan2 text-white py-2 rounded-lg"
          onClick={() => handlePurchaseClick({ rate: currentRates.silverRate, name: 'silver' })}
        >
          Purchase Silver
        </button>
      )}
    </div>
  </div>
</div>

           {/* Gold Membership Pack */}
<div className="flex flex-col rounded-lg shadow-2xl overflow-hidden border border-[#FFD700]">
  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
    <div className="flex-1">
      <h1 className="mt-6 text-center text-3xl font-bold leading-6 text-[#FFD700] flex items-center justify-center">
        {/* Gold Icon */}
        <i className="fas fa-crown mx-2"></i>
        Gold
      </h1>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">3 HD video lessons & tutorials</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">1 Official exam</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">100 Practice questions</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">1 Month subscription</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">1 Free book</span>
        </li>
        <li className="flex items-center text-red-500">
          <span className="ml-3 text-gray-700">No in-depth explanations</span>
        </li>
        <li className="flex items-center text-red-500">
          <span className="ml-3 text-gray-700">No personal instructor assistance</span>
        </li>
      </ul>
    </div>
    <div className="mt-6 text-center">
      {membershipType === 'gold' ? (
        <p className="text-md font-bold bg-yellow-500 p-2 rounded-md text-white">You are in Gold membership</p>
      ) : membershipType === 'platinum' ? (
        <p className="text-md font-bold bg-red-400 p-2 rounded-md text-white">Unavailable. You are in Platinum.</p>
      ) : (
        <button className="w-full bg-custom-cyan hover:bg-custom-cyan2 text-white py-2 rounded-lg" onClick={() => handlePurchaseClick({ rate: currentRates.goldRate, name: 'gold' })}>
          Purchase Gold
        </button>
      )}
    </div>
  </div>
</div>


                {/* Premium Pack */}
              {/* Platinum Membership Pack */}
<div className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-[#7a2dc7]">
  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
    <div className="flex-1">
      <h1 className="mt-6 text-center text-3xl font-bold leading-6 text-[#7a2dc7] flex items-center justify-center">
        {/* Platinum Icon */}
        <i className="fas fa-gem mx-2"></i> 
        Platinum
      </h1>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">3 HD video lessons & tutorials</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">1 Official exam</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">100 Practice questions</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">1 Month subscription</span>
        </li>
        <li className="flex items-center">
          <span className="text-green-500">✔️</span>
          <span className="ml-3 text-gray-700">1 Free book</span>
        </li>
        <li className="flex items-center text-red-500">
          <span className="ml-3 text-gray-700">No in-depth explanations</span>
        </li>
        <li className="flex items-center text-red-500">
          <span className="ml-3 text-gray-700">No personal instructor assistance</span>
        </li>
      </ul>
    </div>
    <div className="mt-6 text-center">
      {membershipType === 'platinum' ? (
        <p className="text-md font-bold bg-purple-600 p-2 rounded-md text-white">You are in Platinum membership</p>
      ) : (
        <button className="w-full bg-custom-cyan hover:bg-custom-cyan2 text-white py-2 rounded-lg" onClick={() => handlePurchaseClick({ rate: currentRates.platinumRate, name: 'platinum' })}>
          Purchase Platinum
        </button>
      )}
    </div>
  </div>
</div>


            </div>
            <SubscriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                planDetails={selectedPlan}
            />
        </div>
    );
};

export default Subscription;
