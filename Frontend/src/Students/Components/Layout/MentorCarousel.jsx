import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { fetchMentors, fetchAds } from '../../../Services/studentService';
import { useDispatch, useSelector } from 'react-redux';
import { setAds } from '../../../Redux/studentSlice';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MentorCard = ({ mentor }) => (
  <div className="bg-gray-100 rounded-lg p-4 shadow-md w-full">
    <div className="flex items-center justify-center mb-4">
      <div className="bg-custom-cyan rounded-full p-3">
        <User size={40} className="text-white" />
      </div>
    </div>
    <h3 className="text-lg font-semibold text-center mb-1">{mentor.firstName} {mentor.lastName}</h3>
    <p className="text-teal-600 text-center text-sm font-medium mb-1">{mentor.specialization}</p>
    <p className="text-gray-600 text-center text-xs mb-2">{mentor.degree}</p>
    <p className="text-blue-600 text-center text-xs mb-2">{mentor.email} </p>
  </div>
);

const AdCard = ({ ad }) => (
  <div className="b2 rounded-lg p-4 shadow-m">
        <p className='text-xs float-end'>ads</p>
    <h4 className="text-lg font-bold mb-2">{ad.title}</h4>
    <img src={ad.image || "/api/placeholder/300/200"} alt={ad.title} className="w-full h-40 object-cover mb-2 rounded" />
    <p className="text-gray-700 mb-2">{ad.content}</p>
    <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Learn More</a>

  </div>
);

const MentorCarousel = () => {
  const [mentors, setMentors] = useState([]);
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.student.ads);

  useEffect(() => {
    getMentors();
    getAds();
  }, []);

  const getMentors = async () => {
    try {
      const response = await fetchMentors();
      setMentors(response);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const getAds = async () => {
    try {
      const adsData = await fetchAds();
      dispatch(setAds(adsData));
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const getAdByPosition = (position) => {
    return ads.find(ad => ad.position === position) || { 
      title: 'No Ad Available',
      content: 'No content available for this position.',
      image: "/api/placeholder/300/200",
      link: '#'
    };
  };

  return (
    <div className="p-4 md:p-9 shadow-lg mx-auto font-roboto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
          {/* <AdCard ad={getAdByPosition('homepage1')} /> */}
        </div>

        <div className="flex-1 text-center">
          <h3 className="text-custom-cyan text-sm mb-2 font-bold">Mentors</h3>
          <h2 className="text-3xl font-bold mb-4">Meet Our Mentors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn UI-UX Design skills with weekend UX. The latest online
            learning system and material that help your knowledge growing.
          </p>
        </div>

        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:ml-4">
          <AdCard ad={getAdByPosition('homepage2')} />
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={false}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="mySwiper p-5"
      >
        {mentors.map((mentor, index) => (
          <SwiperSlide key={index}>
            <MentorCard mentor={mentor} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MentorCarousel;