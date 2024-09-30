import React from 'react';
import MentorRegistrationForm from '../Components/Layout/MentorRegistrationForm';
import { FaInfoCircle } from 'react-icons/fa';
import Footer from '../Components/Layout/Footer';


const MentorApply = () => {

  

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 font-roboto">
      {/* Header Banner */}
      <div className="bg-gray-100 rounded-lg p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-2">Join Eduprops as a Mentor</h1>
          <div className="grid grid-cols-8 gap-1">
            {[...Array(32)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-blue-400 rounded-full"></div>
            ))}
          </div>
        </div>
        <img 
          src="/path-to-mentor-illustration.png" 
          alt="Mentoring" 
          className="w-full sm:w-1/2 lg:w-1/3"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 ">
        {/* Image Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-custom-cyan2 rounded-lg overflow-hidden">
            <img 
              src="src/assets/images/SignUpimage.PNG" 
              alt="Mentor" 
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Application Section */}
        <div className="w-full lg:w-2/3">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Apply As Mentor</h2>
      <p className="text-gray-600 mb-10">
        Teaching is a vital and admirable career. As such, it comes with quite a bit of
        responsibility, both in practice and in preparation with many skills required to
        be a teacher. The following steps provide a general breakdown of the
        requirements for teachers:
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button className="bg-custom-cyan text-white px-4 py-2 rounded w-full sm:w-auto">Instructor Requirements</button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded w-full sm:w-auto">Instructor Rules</button>
      </div>

      <ul className="list-disc list-inside text-gray-600 mb-6">
        <li>An undergraduate degree</li>
        <li>Participate in supervised teaching</li>
        <li>State teaching license</li>
        <li>Pursue graduate studies</li>
      </ul>

      <p className="text-gray-600 mb-6">
        Teaching is a vital and admirable career. As such, it comes with quite a bit of
        responsibility, both in practice and in preparation with many skills required to
        be a teacher. The following steps provide a general breakdown of the
        requirements for teachers:
      </p>

      {/* Important Notice Section */}
      <div className="flex items-start bg-yellow-100 p-4 rounded-md border border-yellow-300 mb-6">
        <FaInfoCircle className="text-yellow-500 mr-3 text-2xl" />
        <p className="text-gray-800">
          Important: All mentor applications must be approved by an admin before gaining access. Please ensure that all documents are correctly submitted and wait for the approval.
        </p>
      </div>
    </div>
      </div>

      <MentorRegistrationForm />
      <Footer/>
    </div>
  );
};

export default MentorApply;
