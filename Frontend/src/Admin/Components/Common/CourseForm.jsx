import React, { useState } from 'react';
import axios from 'axios';
import { AdminInstance } from '../../../Services/apiInstances';
import { addCourse } from '../../../Services/adminService';


const CourseForm = ({ categoryId, closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [instructor, setInstructor] = useState('');
    const [duration, setDuration] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await addCourse({
                title,
                description,
                price,
                instructor,
                duration,
                category: categoryId,
            })
            setTitle('');
            setDescription('');
            setPrice('');
            setInstructor('');
            setDuration('')
            closeModal();
            
        } catch (err) {
           
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
            <div>
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700">Instructor</label>
                <input
                    type="text"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
            </div>
            <div>
                <label className="block text-gray-700">Duration (weeks)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-custom-cyan text-white px-4 py-2 rounded"
            >
                Add Course
            </button>
        </form>
    );
};

export default CourseForm;
