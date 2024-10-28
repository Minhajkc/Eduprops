import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { fetchReviews } from '../../../Services/studentService'; // Adjust the import path accordingly

const StudentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state if needed
  }

  return (
    <div className="bg-white shadow-md mx-auto font-roboto ">
      <h3 className="text-custom-cyan text-sm mb-2 text-center font-bold">Students</h3>
      <h2 className="text-3xl text-center font-bold mb-4">Student Reviews</h2>
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
          <SwiperSlide key={review._id}>
            <div className="bg-custom-cyan2 rounded-lg p-10 text-center text-white shadow-md">
              <p className="italic mb-4">"{review.reviewText}"</p>
              <h3 className="text-lg font-semibold">{review.userName}</h3>
              <p className="text-yellow-500 mb-2">{"⭐".repeat(review.rating)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StudentReviews;
