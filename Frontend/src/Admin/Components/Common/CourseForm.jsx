import React, { useState, useEffect } from 'react';
import { addCourse,updateCourse } from '../../../Services/adminService';

const CourseForm = ({ course, categoryId, refreshCourses, closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [instructor, setInstructor] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        if (course) {
            
            setTitle(course.title || '');
            setDescription(course.description || '');
            setPrice(course.price || '');
            setInstructor(course.instructor || '');
            setDuration(course.duration || '');
        }
    }, [course]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (course) {
                // If the course exists, update it
                await updateCourse(course._id, {
                    title,
                    description,
                    price,
                    instructor,
                    duration,
                    category: categoryId,
                });
            } else {
             
                await addCourse({
                    title,
                    description,
                    price,
                    instructor,
                    duration,
                    category: categoryId,
                });
            }

            // Clear form fields
            setTitle('');
            setDescription('');
            setPrice('');
            setInstructor('');
            setDuration('');

            refreshCourses();
            if (closeModal) closeModal();
        } catch (err) {
            // Handle error if needed
            console.error('Failed to submit the course:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Title */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course Title"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {/* Course Description */}
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Course Description"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-24 resize-none"
            />
            {/* Course Price */}
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Course Price"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {/* Instructor */}
            <input
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="Instructor"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {/* Course Duration */}
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Course Duration (hours)"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          
            <button
                type="submit"
                className="w-full bg-custom-cyan text-white py-2 px-4 rounded-md hover:bg-custom-cyan2"
            >
                {course ? 'Update Course' : 'Add Course'}
            </button>
        </form>
    );
};

export default CourseForm;