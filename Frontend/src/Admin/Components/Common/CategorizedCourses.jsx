import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourseById,getCoursesById,deleteCourseById, deleteCourseLesson  } from '../../../Services/adminService'; // Ensure you have deleteCourseById in your service
import CourseForm from './CourseForm';
import { AiOutlinePlus } from 'react-icons/ai';
import { TrashIcon, PencilIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import VideoAdd from './VideoAdd';
import LessonOverview from './LessonOverview';



const CategorizedCourses = ({ categoryId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null); // State for the selected course to edit
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    const fetchCourses = async () => {
        try {
            const coursesResponse = await getCoursesById();
            const filteredCourses = coursesResponse.filter((course) => course.category === categoryId);
            setCourses(filteredCourses);
        } catch (err) {
            setError('Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [categoryId]);

    const openModal = async (course) => {
        if (course) {
            try {
   
                const courseDetails = await getCourseById(course._id);
                setSelectedCourse(courseDetails);
            } catch (err) {
                setError('Failed to fetch course details');
            }
        } else {
            setSelectedCourse(null); 
        }
        setIsModalOpen(true);
    };

    
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = async (courseId) => {
        const confirmed = window.confirm("Are you sure you want to delete this course?");
        if (confirmed) {
            try {
                await deleteCourseById(courseId);
                fetchCourses(); 
            } catch (err) {
                setError('Failed to delete course');
            }
        }
    };

    const openVideoModal = (courseId) => {
        setSelectedCourseId(courseId);
        setIsVideoModalOpen(true);
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        setSelectedCourseId(null);
    };

    
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-8 rounded-lg w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl ml-4 font-semibold">Courses</h2>
            <button
                onClick={() => openModal()}
                className="flex items-center bg-custom-cyan text-white py-3 px-6 rounded-md hover:bg-custom-cyan2 text-lg"
            >
                <AiOutlinePlus className="mr-2" />
                Add New Course
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {courses.length > 0 ? (
                courses.map((course) => (
                    <div
                        key={course._id}
                        className="flex flex-col bg-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
                    >
                        <img src={course.image} alt="" className="w-full h-48 object-cover"/>
                        
                        <div className="p-6">
                            <Link to={`/admin/course/${course._id}`}>
                                <h4 className="text-2xl font-bold text-blue-600 hover:underline mb-3">
                                    {course.title}
                                </h4>
                            </Link>
                            
                            <p className="text-gray-700 mb-4">{course.description}</p>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-2xl text-gray-900 font-bold">${course.price}</p>
                                <p className="text-lg text-gray-600">{course.duration} hours</p>
                            </div>
                            <div className="flex justify-center gap-6 mb-6">
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="text-red-500 hover:text-red-700 border-2 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-red-500 p-2 rounded-full transition-all duration-300"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => openModal(course)}
                                    className="text-blue-500 hover:text-blue-700 border-2 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-full transition-all duration-300"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => openVideoModal(course._id)}
                                    className="text-orange-500 border-2 hover:border-orange-300 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 p-2 rounded-full transition-all duration-300"
                                >
                                    
                                    <span className="flex items-center space-x"><AiOutlinePlus className="mr-2" /> <VideoCameraIcon className="h-5 w-5" /> </span>
                                </button>
                            </div>
                            <LessonOverview lessons={course.lessons} courseId={course._id} fetchCourses={fetchCourses}/>
                        </div>
                    </div>
                ))
            ) : (
                <p className="col-span-full text-center text-xl text-gray-500">No courses found for this category.</p>
            )}
        </div>
    
        {/* VideoAdd Modal */}
        {isVideoModalOpen && (
            <VideoAdd
                courseId={selectedCourseId}
                closeModal={closeVideoModal}
                refreshCourses={fetchCourses}
            />
        )}
    
        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
                    <h3 className="text-2xl font-bold mb-6">
                        {selectedCourse ? 'Edit Course' : 'Add New Course'}
                    </h3>
                    <CourseForm 
                        categoryId={categoryId} 
                        refreshCourses={fetchCourses} 
                        closeModal={closeModal} 
                        course={selectedCourse} 
                    />
                    <button
                        onClick={closeModal}
                        className="mt-6 bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition-all duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        )}
    </div>
    );
};

export default CategorizedCourses;
