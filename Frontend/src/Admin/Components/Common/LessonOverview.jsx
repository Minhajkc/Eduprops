import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteCourseLesson } from '../../../Services/adminService'; // Ensure correct path

const LessonOverview = ({ courseId, lessons, fetchCourses }) => {
    const handleDeleteLesson = async (lessonIndex) => {
        try {
            await deleteCourseLesson(courseId, lessonIndex);
            fetchCourses();
        } catch (error) {
            // Handle error if needed
        }
    };

    return (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-lg">
      
            {lessons && lessons.length > 0 ? (
                <div className="space-y-4">
                    {lessons.map((lesson, lessonIndex) => (
                        <div
                            key={lessonIndex}
                            className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500 flex justify-between items-center hover:shadow-md transition duration-300"
                        >
                            <div className="flex flex-col">
                                <h6 className="text-xl font-semibold text-gray-800">Lesson {lessonIndex + 1}</h6>
                                <p className="text-indigo-600 font-medium mt-1">
                                    {lesson.url.length} Video{lesson.url.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDeleteLesson(lessonIndex)}
                                className="text-red-500 hover:text-red-700 focus:outline-none transform hover:scale-110 transition duration-300"
                            >
                                <TrashIcon className="h-6 w-6" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 italic">No lessons available</p>
            )}
        </div>
    );
};

export default LessonOverview;