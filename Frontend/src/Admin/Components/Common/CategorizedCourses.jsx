// components/Common/CategorizedCourses.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCoursesById } from '../../../Services/adminService';

const CategorizedCourses = ({ categoryId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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

        fetchCourses();
    }, [categoryId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-white rounded-lg w-full mx-auto">
            <h2 className="text-4xl ml-4 font-semibold mb-6">Courses</h2>
            <div className="flex flex-wrap gap-6 mt-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div
                            key={course._id}
                            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md w-60 text-center"
                        >
                            <Link to={`/admin/course/${course._id}`}>
                                <h4 className="text-lg font-semibold text-blue-600 hover:underline">
                                    {course.title}
                                </h4>
                            </Link>
                            <p className="text-gray-700 mt-2">{course.description}</p>
                            <p className="text-gray-900 font-semibold mt-2">${course.price}</p>
                            <p className="text-gray-600 mt-1">{course.duration} hours</p>
                        </div>
                    ))
                ) : (
                    <p>No courses found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default CategorizedCourses;
