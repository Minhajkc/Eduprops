import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const MentorBanner = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/Mentorapply'); // Navigates to the Mentorapply page
    window.scrollTo(0, 0); // Scrolls to the top of the page
  };
  return (
    <div className="bg-custom-cyan2 flex flex-col items-center justify-center md:flex-row md:justify-center p-8 font-roboto">
      <div className="bg-cyan-100 rounded-md overflow-hidden mb-4 md:mb-0 md:mr-8 lg:block hidden">
        <img 
          src="src/assets/images/Mentorimage.PNG" 
          alt="Mentor" 
           className="w-5 h-auto object-cover md:h-72 md:w-full" // Adjusting width for larger size

        />
      </div>
      <div className="flex-grow text-center md:text-center">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Become a Mentor</h2>
        <p className="text-white text-base md:text-lg mb-4">
          Instructors from around the world teach millions of students on Byway. 
          We provide the tools and skills to teach what you love.
        </p>

          <button className="bg-custom-cyan text-white px-6 py-3 rounded-full font-semibold hover:bg-cyan-300 transition duration-300"  onClick={handleNavigate}>
            Start your instructor journey →
          </button>
   
      </div>
    </div>
  );
};

export default MentorBanner;
