import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../Services/studentService';
import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { showToastSuccess, showToastError } from '../../utils/toastify';

const CourseFullViewPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(courseId);
        setCourse(response);
        if (response.lessons && response.lessons.length > 0) {
          setSelectedVideo(response.lessons[0].url[0]); // Set the first video by default
        }
      } catch (err) {
        setError('Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleVideoSelect = (url, isLocked) => {
    if (isLocked) {
      showToastError('This lesson is locked. Purchase the course to unlock!');
    } else {
      setSelectedVideo(url);
    }
  };

  const handleAddToCart = () => {
    console.log('Added to cart');
    toast.success('Course added to cart!');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course found</div>;

  return (
    <div className="bg-white p-6 font-roboto">
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>

      {/* Video Player and Lesson List */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Left Side: Video Player */}
        <div className="md:w-2/3">
          {selectedVideo ? (
            <video className="w-full h-auto rounded-2xl" controls>
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="bg-gray-200 h-80 flex items-center justify-center">
              <p>Select a video to play</p>
            </div>
          )}
        </div>

        {/* Right Side: Lesson List */}
        <div className="md:w-1/3 space-y-4 bg-custom-cyan2 p-5 text-white font-bold rounded-lg">
          <h2 className="text-5xl text-center font-bold mb-4">Lessons</h2>
          {course.lessons && course.lessons.length > 0 ? (
            course.lessons.map((lesson, index) => {
              const isLocked = index !== 0; // Lock all lessons except the first one
              return (
                <div key={index} className="p-4 rounded-lg shadow-md">
                  <h3 className="text-custom-cyan">Lesson: {index + 1}</h3>
                  <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>

                  {lesson.url && lesson.url.length > 0 ? (
                    lesson.url.map((url, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleVideoSelect(url, isLocked)}
                        className="w-full text-left p-2 duration-150 hover:bg-cyan-800 rounded flex items-center justify-between"
                      >
                        <span>Video {idx + 1}</span>
                        {isLocked && <FaLock className="text-custom-cyan" />}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">{lesson.description}</p>
                  )}
                </div>
              );
            })
          ) : (
            <p>No lessons available</p>
          )}
        </div>
      </div>

      {/* Course Details */}
      <div className="mb-8">
        <img src={course.image} alt={course.title} className="w-full h-64 object-cover mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-2/3">
            <p className="text-lg text-gray-800 mb-4">{course.description}</p>
            <p className="text-md font-bold text-gray-900 mb-4">Price: ${course.price}</p>
            <p className="text-md text-gray-700 mb-4">Duration: {course.duration} Hours</p>
            <p className="text-md text-gray-700 mb-4">Category: {course.category}</p>
            <p className="text-md text-gray-700 mb-4">Instructor: {course.instructor}</p>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#00b8d4] text-white px-6 py-3 rounded-full hover:bg-[#0099b3] transition-colors duration-300 text-lg font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFullViewPage;
