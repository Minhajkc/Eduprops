import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourseById,getCoursesById,deleteCourseById  } from '../../../Services/adminService'; // Ensure you have deleteCourseById in your service
import CourseForm from './CourseForm';
import { AiOutlinePlus } from 'react-icons/ai';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
 // Import icons for delete and edit

const CategorizedCourses = ({ categoryId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null); // State for the selected course to edit

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
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-white rounded-lg w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl ml-4 font-semibold">Courses</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center bg-custom-cyan text-white py-2 px-4 rounded-md hover:bg-custom-cyan2"
                >
                    <AiOutlinePlus className="mr-2" /> 
                    Add New Course
                </button>
            </div>
            <div className="flex flex-wrap gap-6 mt-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div
                            key={course._id}
                            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md w-60 text-center relative"
                        >
                            <Link to={`/admin/course/${course._id}`}>
                                <h4 className="text-lg font-semibold text-blue-600 hover:underline">
                                    {course.title}
                                </h4>
                            </Link>
                            <p className="text-gray-700 mt-2">{course.description}</p>
                            <p className="text-gray-900 font-semibold mt-2">${course.price}</p>
                            <p className="text-gray-600 mt-1">{course.duration} hours</p>
                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="text-red-400 rounded-full hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <TrashIcon className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={() => openModal(course)}
                                    className="text-blue-400 rounded-full hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No courses found for this category.</p>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">
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
                            className="mt-4 bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-600"
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
