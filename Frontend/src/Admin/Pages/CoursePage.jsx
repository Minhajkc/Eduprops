// components/CoursePage.js
import React, { useState } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import CategoryForm from '../Components/Common/CategoryForm'; // Adjust the path as necessary
import CategoryList from '../Components/Common/CategoryList';

function CoursePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex ">
            <Sidebar />
            <div className="flex-1 p-4">
                <button
                    onClick={openModal}
                    className="bg-custom-cyan ml-10 text-white px-4 py-2 rounded flex items-center space-x-2 mb-4 md:mb-6"
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
                    <span className="hidden md:block">Add New Category</span>
                </button>
                

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2  right-2 text-gray-500 hover:text-gray-700"
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
                            <CategoryForm />
                        </div>
                    </div>
                )}

                {/* Separate section for CategoryList */}
                <div className="mt-6 ">
               
                    <CategoryList />
                </div>
            </div>
        </div>
    );
}

export default CoursePage;
