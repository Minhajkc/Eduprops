import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AdminInstance } from '../../Services/apiInstances';
import CourseForm from '../Components/Common/CourseForm'; // Import the CourseForm component
import CategorizedCourses from '../Components/Common/CategorizedCourses';


const CategoryPage = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await AdminInstance.get(`courses/${categoryId}`);
                setCategory(response.data);
            } catch (err) {
                setError('Failed to fetch category');
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categoryId]);

    

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-white rounded-lg shadow-md mx-auto max-w-4xl">
            <h1 className="text-3xl font-semibold mb-4">{category?.name}</h1>
            <div className="mb-4">
                {/* Button to open the modal */}
                <button
                    onClick={openModal}
                    className="bg-custom-cyan text-white px-4 py-2 rounded flex items-center space-x-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    <span>Add New Course</span>
                </button>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <CourseForm categoryId={categoryId} closeModal={closeModal} />
                            
                        </div>
                       
                    </div>
                )}
            </div>
            <CategorizedCourses categoryId={categoryId}/>
            <p className="text-gray-700">{category?.description}</p>
        </div>
    );
};

export default CategoryPage;
