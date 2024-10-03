import React, { useState, useEffect } from 'react';
import { addCourse, updateCourse } from '../../../Services/adminService';

const CourseForm = ({ course, categoryId, refreshCourses, closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [instructor, setInstructor] = useState('');
    const [duration, setDuration] = useState('');
    const [whatYouLearn, setWhatYouLearn] = useState(''); // New state for "What You Learn"
    const [image, setImage] = useState(null); // State for hero image

    useEffect(() => {
        if (course) {
            setTitle(course.title || '');
            setDescription(course.description || '');
            setPrice(course.price || '');
            setDuration(course.duration || '');
            setWhatYouLearn(course.whatYouLearn || ''); // Load existing data if editing
            setImage(course.image || null); // Load existing image if editing
        }
    }, [course]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('duration', duration);
        formData.append('category', categoryId);
        formData.append('whatYouLearn', whatYouLearn); // Include the new field
        if (image) {
            formData.append('image', image); // Include the hero image
        }
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            if (course) {
                await updateCourse(course._id, formData);
            } else {
                await addCourse(formData);
            }

            setTitle('');
            setDescription('');
            setPrice('');
            setDuration('');
            setWhatYouLearn(''); // Clear the new field
            setImage(null); // Clear the image

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
          
            {/* Course Duration */}
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Course Duration (hours)"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {/* What You Learn */}
            <textarea
                value={whatYouLearn}
                onChange={(e) => setWhatYouLearn(e.target.value)}
                placeholder="What You Learn"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-24 resize-none"
            />
            {/* Hero Image Upload */}
            <div>
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
               
            </div>

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
