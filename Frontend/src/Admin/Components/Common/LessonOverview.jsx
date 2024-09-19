import React, { useState } from 'react';
import { Trash2, Edit3 } from 'lucide-react';
import { deleteCourseLesson } from '../../../Services/adminService'; // Ensure correct path
import VideoAdd from './VideoAdd';

const LessonOverview = ({ courseId, lessons, fetchCourses }) => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [editLesson, setEditLesson] = useState(null);
    const [editLessonIndex, setEditLessonIndex] = useState(null);

    const handleDeleteLesson = async (lessonIndex) => {
        try {
            await deleteCourseLesson(courseId, lessonIndex);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting lesson:', error);
        }
    };

    const openVideoModal = (lesson, lessonIndex) => {
        setEditLesson(lesson);
        setEditLessonIndex(lessonIndex);
        setIsVideoModalOpen(true);
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        setEditLesson(null);
        setEditLessonIndex(null);
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
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openVideoModal(lesson, lessonIndex)}
                                    className="text-blue-500 hover:text-blue-700 border-2 focus:outline-none p-2 rounded-full transition-colors duration-300 hover:bg-blue-100"
                                    aria-label="Edit lesson"
                                >
                                    <Edit3 className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteLesson(lessonIndex)}
                                    className="text-red-500 hover:text-red-700 border-2 focus:outline-none p-2 rounded-full transition-colors duration-300 hover:bg-red-100"
                                    aria-label="Delete lesson"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 italic">No lessons available</p>
            )}
            {isVideoModalOpen && (
                <VideoAdd
                    courseId={courseId}
                    lesson={editLesson}
                    lessonIndex={editLessonIndex}
                    closeModal={closeVideoModal}
                    refreshCourses={fetchCourses}
                />
            )}
        </div>
    );
};

export default LessonOverview;