import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CogIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { editCategory, deleteCategory, getCategoryById } from '../../../Services/adminService';
import CategoryForm from '../Common/CategoryForm';
import Modal from '../Specific/Modal';
import { Flex, Spin } from 'antd';

const iconMap = {
    AcademicCapIcon: <AcademicCapIcon className="h-16 w-16 text-blue-500" />,
    BookOpenIcon: <BookOpenIcon className="h-16 w-16 text-green-500" />,
    BriefcaseIcon: <BriefcaseIcon className="h-16 w-16 text-red-500" />,
    CogIcon: <CogIcon className="h-16 w-16 text-yellow-500" />
};

const CategoryList = ({ categories, loading, error, onCategoryUpdate }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    if (loading)  return <div className="flex items-center justify-center h-screen bg-gray-100">
    <Spin  size='large'/>;
</div>
    if (error) return <div className="text-red-500 text-center text-xl mt-8">{error}</div>;

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id);
                onCategoryUpdate();
            } catch (err) {
                alert('Failed to delete the category');
            }
        }
    };

    const handleEdit = async (id) => {
        try {
            const category = await getCategoryById(id);
            setSelectedCategory(category);
            setIsFormOpen(true);
        } catch (err) {
            alert('Failed to fetch the category');
        }
    };

    const handleCategoryUpdate = async (updatedCategory) => {
        try {
            await editCategory(updatedCategory._id, updatedCategory);
            setIsFormOpen(false);
            onCategoryUpdate();
        } catch (err) {
            alert('Failed to edit the category');
        }
    };

    return (
        <div className="p-8  min-h-screen font-roboto">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-gray-800">Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="p-6 items-center justify-center text-center">
                                <div className="flex justify-center mb-4 ">
                                    {iconMap[category.icon] || <div className="h-16 w-16 text-gray-400">No Icon</div>}
                                </div>
                                <Link to={`/admin/courses/${category._id}`}>
                                    <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-2">{category.name}</h3>
                                </Link>
                                {category.description && <p className="text-gray-600 mb-4">{category.description}</p>}
                            </div>
                            <div className="bg-gray-50 px-6 py-3 flex  space-x-9">
                                <p className='text-xs'>
    {new Date(category.createdAt).toLocaleString('en-GB', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    })}
</p>

                                <button
                                    onClick={() => handleEdit(category._id)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                                >
                                    <PencilSquareIcon className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={() => handleDelete(category._id)}
                                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                >
                                    <TrashIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
                <CategoryForm
                    updateCategory={handleCategoryUpdate}
                    initialValues={selectedCategory}
                    closeForm={() => setIsFormOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default CategoryList;