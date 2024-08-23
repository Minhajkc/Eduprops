import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CogIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { editCategory, deleteCategory, getCategoryById } from '../../../Services/adminService';
import CategoryForm from '../Common/CategoryForm';
import Modal from '../Specific/Modal'; // Import the Modal component

const iconMap = {
    AcademicCapIcon: <AcademicCapIcon className="h-12 w-12 text-blue-500" />,
    BookOpenIcon: <BookOpenIcon className="h-12 w-12 text-green-500" />,
    BriefcaseIcon: <BriefcaseIcon className="h-12 w-12 text-red-500" />,
    CogIcon: <CogIcon className="h-12 w-12 text-yellow-500" />
};

const CategoryList = ({ categories, loading, error, onCategoryUpdate }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id);
                onCategoryUpdate(); // Refresh the list after deletion
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
        <div className="p-8 bg-white rounded-lg w-full mx-auto">
        <h2 className="text-4xl ml-4 font-semibold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-6">
            {categories.map((category) => (
                <div
                    key={category._id}
                    className="flex flex-col  items-center p-6 bg-gray-100 rounded-lg shadow-md w-60 text-center"
                >
                    <div className="flex-shrink-0 mb-4">
                        {iconMap[category.icon] || <div className="h-12 w-12 text-gray-500">No Icon</div>}
                    </div>
                    <div className="mb-4">
                        <Link to={`/admin/courses/${category._id}`}>
                            <h3 className="text-lg font-semibold text-blue-600 hover:underline">{category.name}</h3>
                        </Link>
                        {category.description && <p className="text-gray-700 mt-2">{category.description}</p>}
                    </div>
                    <div className="flex gap-4 rounded  bg-slate-200 px-4 py-1">
                        <button
                            onClick={() => handleDelete(category._id)}
                            className="text-red-400 rounded-full hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <TrashIcon className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => handleEdit(category._id)}
                            className="text-blue-400 rounded-full hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <PencilIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            ))}
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
