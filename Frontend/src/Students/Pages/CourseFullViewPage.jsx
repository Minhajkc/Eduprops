import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../Services/studentService';
import { FaLock, FaPlay, FaBook, FaVideo, FaClock, FaUser, FaTag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { showToastError } from '../../utils/toastify';

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
                console.log(response)
                setCourse(response);
                if (response.firstLessonFirstVideoUrl) {
                    setSelectedVideo(response.firstLessonFirstVideoUrl);
                }
            } catch (err) {
                setError('Failed to fetch course details');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleVideoSelect = (url, index) => {
        if (index === 0) {
            setSelectedVideo(url);
        } else {
            showToastError('This lesson is locked. Please Purchase this course to continue.');
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
                    <div className="bg-gray-200 h-80 flex items-center justify-center rounded-2xl">
                        <p className="text-gray-600">Select a video to play</p>
                    </div>
                )}
            </div>

            {/* Right Side: Lesson List */}
            <div className="md:w-1/3 space-y-4 bg-custom-cyan2 p-5 text-white font-bold rounded-lg">
                <h2 className="text-5xl text-center font-bold mb-4">Lessons</h2>
                {course.lessonsInfo && course.lessonsInfo.length > 0 ? (
                    course.lessonsInfo.map((lesson, index) => (
                        <div key={index} className="p-4 rounded-lg shadow-md bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
                            <h3 className="text-custom-cyan flex items-center justify-between">
                                <span><FaBook className="inline mr-2" />Lesson: {index + 1}</span>
                                {index !== 0 && <FaLock className="text-custom-cyan" />}
                            </h3>
                            <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                            <p className="text-sm text-gray-200">{lesson.description}</p>
                            <div className="flex items-center justify-between mt-2">
                                <span><FaVideo className="inline mr-2" /> Videos: {lesson.videoCount}</span>
                                <button
                                    onClick={() => handleVideoSelect(course.firstLessonFirstVideoUrl, index)}
                                    className={`px-3 py-1 rounded-full ${index === 0 ? 'bg-custom-cyan text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                                >
                                    <FaPlay className="inline mr-1" /> {index === 0 ? 'Playing...' : 'Locked'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No lessons available</p>
                )}
            </div>
        </div>

        {/* Course Details */}
        <div className="mb-8">
            <img src={course.image} alt={course.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="md:w-2/3">
                    <p className="text-lg text-gray-800 mb-4">{course.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <p className="text-md font-bold text-gray-900 flex items-center">
                            <FaTag className="mr-2 text-custom-cyan" /> Price: ${course.price}
                        </p>
                        <p className="text-md text-gray-700 flex items-center">
                            <FaClock className="mr-2 text-custom-cyan" /> Duration: {course.duration} Hours
                        </p>
                        <p className="text-md text-gray-700 flex items-center">
                            <FaBook className="mr-2 text-custom-cyan" /> Category: {course.category}
                        </p>
                        <p className="text-md text-gray-700 flex items-center">
                            <FaUser className="mr-2 text-custom-cyan" /> Instructor: {course.instructor}
                        </p>
                    </div>
                </div>
                <div className="md:w-1/3 mt-6 md:mt-0">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-[#00b8d4] text-white px-6 py-3 rounded-full hover:bg-[#0099b3] transition-colors duration-300 text-lg font-semibold flex items-center justify-center"
                    >
                        <FaTag className="mr-2" /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CourseFullViewPage;
