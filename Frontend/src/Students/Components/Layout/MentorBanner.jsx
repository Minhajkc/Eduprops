import React from 'react';
import { Link } from 'react-router-dom';

const MentorBanner = () => {
  return (
    <div className="bg-custom-cyan2 flex flex-col items-center justify-center md:flex-row md:justify-center p-10">
      <div className="bg-purple-200 rounded-md overflow-hidden mb-4 md:mb-0 md:mr-8 lg:block hidden">
        <img 
          src="src/assets/images/SignUpimage.PNG" 
          alt="Mentor" 
          className="w-48 h-48 object-cover"
        />
      </div>
      <div className="flex-grow text-center md:text-center">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Become a Mentor</h2>
        <p className="text-white text-base md:text-lg mb-4">
          Instructors from around the world teach millions of students on Byway. 
          We provide the tools and skills to teach what you love.
        </p>
        <Link to="/Mentorapply" className="inline-block">
          <button className="bg-custom-cyan text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-300 transition duration-300">
            Start your instructor journey →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MentorBanner;
