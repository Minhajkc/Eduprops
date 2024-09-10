import React from 'react';


const Hero = () => {
  return (
    <div className="container mx-auto px-5 lg:px-11 py-8 sm:py-12 lg:py-16 font-roboto">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Content section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-900">Up Your </span>
            <span className="text-cyan-400">Skills</span>
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-cyan-400">To Advance </span>
            <span className="text-gray-900">Your</span>
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-cyan-400">Career </span>
            <span className="text-gray-900">Path</span>
          </h2>
          <p className="text-gray-600 mb-6 text-lg mx-auto lg:mx-0 max-w-2xl">
            Learn UI-UX Design skills with weekend UX. The latest online
            learning system and material that help your knowledge growing.
          </p>
          <button className="bg-cyan-400 text-white font-bold py-2 px-4 md:py-3 md:px-6 lg:py-3 lg:px-8 rounded-full  hover:bg-cyan-500 transition duration-300 text-base md:text-lg">
             Explore Courses
            </button>

          <div className="flex flex-wrap mt-8 gap-6 justify-center lg:justify-start">
            <div className="flex items-center text-base">
              <svg className="w-7 h-7 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>Public Speaking</span>
            </div>
            <div className="flex items-center text-base">
              <svg className="w-7 h-7 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <span>Career-Oriented</span>
            </div>
            <div className="flex items-center text-base">
              <svg className="w-7 h-7 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <span>Creative Thinking</span>
            </div>
          </div>
        </div>

       <div className="hidden lg:block lg:w-1/2 relative">
  <div className="w-full h-[600px] relative">
    {/* Top right circle */}
    <div className="absolute top-0 right-12 p-2 bg-white rounded-full border-4 border-blue-500">
      <div className="w-79 h-72 bg-blue-500 rounded-full overflow-hidden">
        <img src="src/assets/images/SignUpimage.PNG" alt="Student 1" className="w-full h-full object-cover" />
      </div>
    </div>

    {/* Left circle */}
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white border-4 border-red-500 rounded-full">
      <div className="w-90 h-80 bg-red-500 rounded-full overflow-hidden">
        <img src="src/assets/images/SignUpimage.PNG" alt="Student 2" className="w-full h-full object-cover" />
      </div>
    </div>

    {/* Bottom right circle */}
    <div className="absolute bottom-0 right-20 p-2 bg-white border-4 border-yellow-500 rounded-full ">
      <div className="w-60 h-60 bg-yellow-500 rounded-full overflow-hidden">
        <img src="src/assets/images/SignUpimage.PNG" alt="Student 3" className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</div>
        
      </div>
    </div>
  );
};

export default Hero;