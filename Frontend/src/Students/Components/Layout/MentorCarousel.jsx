import React, { useState, useEffect, useRef } from 'react';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchMentors } from '../../../Services/studentService';

const MentorCard = ({ mentor }) => (
  <div className="bg-gray-100 rounded-lg p-4  shadow-md w-full flex-shrink-0">
    <div className="flex items-center justify-center mb-4">
      <div className="bg-custom-cyan rounded-full p-3">
        <User size={40} className="text-white" />
      </div>
    </div>
    <h3 className="text-lg font-semibold text-center mb-1">{mentor.firstName} {mentor.lastName}</h3>
    <p className="text-teal-600 text-center text-sm font-medium mb-1">{mentor.specialization}</p>
    <p className="text-gray-600 text-center text-xs mb-2">{mentor.degree}</p>
    <p className="text-blue-600 text-center text-xs mb-2 ">{mentor.email}</p>
    <div className="flex justify-center space-x-2">
   
    
    </div>
  </div>
);

const MentorCarousel = () => {
  const [mentors, setMentors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    getMentors();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [mentors]);

  const getMentors = async () => {
    try {
      const response = await fetchMentors();
      setMentors(response);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const moveNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 8);
  };

  const movePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 +4) % 1);
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: currentIndex * scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  if (mentors.length === 0) {
    return <div className="text-center">Loading mentors...</div>;
  }

  return (
    <div className="p-9 shadow-lg mx-auto font-roboto">
         <div className="text-center mb-8">
        <h3 className="text-custom-cyan text-sm mb-2 font-bold">Mentors</h3>
        <h2 className="text-3xl font-bold mb-4">Meet Our Mentors</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn UI-UX Design skills with weekend UX. The latest online
          learning system and material that help your knowledge growing.
        </p>
      </div>
      <div className="relative py-5">
        <div 
          ref={carouselRef}
          className="flex overflow-x-hidden scroll-smooth  pb-5"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {mentors.concat(mentors.slice(0, 3)).map((mentor, index) => (
            <div 
              key={index} 
              className="w-full flex-shrink-0 px-2 sm:w-1/3 lg:w-1/4"
              style={{ scrollSnapAlign: 'start' }}
            >
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default MentorCarousel;