import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const StudentReviews = () => {
  const reviews = [
    {
      id: 1,
      student: 'John Doe',
      review: 'The course was amazing and really helped me improve my skills!',
      rating: 5,
    },
    {
      id: 2,
      student: 'Jane Smith',
      review: 'A comprehensive and well-structured course. Highly recommend it!',
      rating: 4,
    },
    {
      id: 3,
      student: 'Mike Johnson',
      review: 'The lessons were clear, and the instructors were very knowledgeable.',
      rating: 5,
    },
    {
      id: 4,
      student: 'Emily Davis',
      review: 'Great course! I learned a lot and the projects were fun to complete.',
      rating: 5,
    },
  ];

  return (
    <div className="bg-white shadow-md mx-auto font-roboto ">
         <h3 className="text-custom-cyan text-sm mb-2 text-center font-bold">Students</h3>
      <h2 className="text-3xl text-center  font-bold mb-4">Student Reviews</h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-gray-100 rounded-lg p-10 text-center shadow-md">
              <p className="text-gray-600 italic mb-4">"{review.review}"</p>
              <h3 className="text-lg font-semibold">{review.student}</h3>
              <p className="text-yellow-500 mb-2">{"⭐".repeat(review.rating)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StudentReviews;