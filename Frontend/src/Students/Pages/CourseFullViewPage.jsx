import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getCourseById,addCourseToCart} from '../../Services/studentService';
import { FaLock, FaPlay, FaBook, FaVideo, FaClock, FaUser, FaTag, FaList,FaShoppingCart,FaCartArrowDown  } from 'react-icons/fa';
import { CiClock2 } from "react-icons/ci";
import { toast } from 'react-toastify';
import { showToastError } from '../../utils/toastify';
import { getCategoryCoursesById } from '../../Services/studentService';
import Footer from '../Components/Layout/Footer';


const CourseFullViewPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [similarCourses, setSimilarCourses] = useState(null);
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
                if (response.category) {
                    const similarResponse = await getCategoryCoursesById(response.category);
                    const filteredSimilarCourse = similarResponse.filter((course)=>course._id!=courseId).slice(0,4)
                    setSimilarCourses(filteredSimilarCourse);
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

    const handleCart = async (id) => {
        try{
            await addCourseToCart(id);
          }catch(e){
           setError('Failed to add course to cart');
          }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!course) return <div>No course found</div>;
    const handleCardClick = (courseId) => {
        navigate(`/courses/category/selectedcourse/${courseId}`); 
        window.location.reload()
      }

    return (
        <div className="bg-white p-6 font-roboto">
        <h1 className="text-3xl font-bold mb-6">{course.title}</h1>

        {/* Video Player and Lesson List */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
    {/* Left Side: Video Player */}
    <div className="lg:w-2/3 w-full">
        {selectedVideo ? (
            <video className="w-full h-auto rounded-2xl shadow-lg" controls>
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        ) : (
            <div className="bg-gray-200 h-64 sm:h-80 md:h-96 flex items-center justify-center rounded-2xl shadow-lg">
                <p className="text-gray-600 text-center px-4">Select a video to play</p>
            </div>
        )}
    </div>

    {/* Right Side: Lesson List */}
    <div className="lg:w-1/3 bg-indigo-100 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-indigo-800">Course Lessons</h2>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                                {course.lessonsInfo && course.lessonsInfo.map((lesson, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md">
                                        <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                                            <span><FaBook className="inline mr-2 text-indigo-600" />Lesson {index + 1}</span>
                                            {index !== 0 && <FaLock className="text-gray-400" />}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500"><FaVideo className="inline mr-1" /> {lesson.videoCount} videos</span>
                                            <button
                                                onClick={() => handleVideoSelect(course.firstLessonFirstVideoUrl, index)}
                                                className={`px-3 py-1 rounded-full text-xs ${index === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                                            >
                                                <FaPlay className="inline mr-1" /> {index === 0 ? 'Play' : 'Locked'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
</div>



       {/* Course Details */}
<div className="mb-8 flex flex-col lg:flex-row gap-8">
    {/* Left side: Image */}
    <div className="lg:w-1/2">
        <img src={course.image} alt={course.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
    </div>

    {/* Right side: Course details and Add to Cart */}
    <div className="lg:w-1/2 bg-white rounded-lg shadow-lg p-4 ">
        <h2 className="text-3xl font-bold mb-4 text-custom-cyan text-center">Course Details</h2>
        <p className="text-lg text-gray-800 mb-6 text-center leading-relaxed">{course.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-md font-bold text-gray-900 flex items-center">
                    <FaTag className="mr-3 text-custom-cyan text-xl" /> 
                    <span>Price: <span className="text-custom-cyan">₹{course.price}</span></span>
                </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-md text-gray-700 flex items-center">
                    <FaClock className="mr-3 text-custom-cyan text-xl" /> 
                    <span>Duration: <span className="font-semibold">{course.duration} Hours</span></span>
                </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-md text-gray-700 flex items-center">
                    <FaBook className="mr-3 text-custom-cyan text-xl" /> 
                    <span>What You'll Learn: <span className="font-semibold">{course.whatYouLearn}</span></span>
                </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-md text-gray-700 flex items-center">
                    <FaList className="mr-3 text-custom-cyan text-xl" /> 
                    <span>Lessons: <span className="font-semibold">{course.lessonsInfo.length}</span></span>
                </p>
            </div>
            <div className="bg-gray-50 p-4 flex justify-center rounded-lg sm:col-span-2">
                <p className="text-md text-gray-700 flex items-center">
                    <FaUser className="mr-3 text-custom-cyan text-xl" /> 
                    <span>Instructor: <span className="font-semibold">{course.instructor}</span></span>
                </p>
            </div>
        </div>
<div className='flex justify-center lg:m-5 '>
        <button
            onClick={() => handleCart(course.id)}
            className="w-1/2 bg-custom-cyan hover:bg-custom-cyan2  text-white mb-2 lg:px-6 lg:py-3 p-2 rounded-full hover:bg-opacity-90 transition-all duration-300 lg:text-lg text-sm font-semibold flex items-center justify-center "
        >
            <FaShoppingCart className="mr-3 lg:text-xl " /> Add to Cart
        </button>
        </div>
    </div>
    
</div>
<div className="bg-[#00b8d4] h-40 rounded-lg"></div>
<div className="mt-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Similar Courses</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarCourses.map((course) => (
                                <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                                    <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-2 text-indigo-800 cursor-pointer" onClick={() => handleCardClick(course._id)}>{course.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500 flex items-center"><CiClock2 className="mr-1" />{course.duration} hours</span>
                                            <span className="text-lg font-bold text-custom-cyan2">₹{course.price}</span>
                                        </div>
                                        <button 
                                            onClick={() => handleCart(course._id)}
                                            className="mt-4 w-full bg-custom-cyan text-white py-2 rounded-full hover:bg-custom-cyan2 transition-colors duration-300 flex items-center justify-center"
                                        >
                                            <FaCartArrowDown className="mr-2" /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

          
 <Footer/>
    </div>
    
    
    );
};

export default CourseFullViewPage;
