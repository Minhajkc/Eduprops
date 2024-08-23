import React, { useState, useEffect } from 'react';
import IconSelector from '../Specific/IconSelector'; 

const CategoryForm = ({ addCategory, updateCategory, initialValues, }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('AcademicCapIcon');
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name || '');
            setDescription(initialValues.description || '');
            setSelectedIcon(initialValues.icon || 'AcademicCapIcon');
        }
    }, [initialValues]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (initialValues) {
                await updateCategory({
                    _id: initialValues._id,
                    name,
                    description,
                    icon: selectedIcon,
                });
            } else {
                await addCategory(name, description, selectedIcon);
            }
          
            setName('');
            setDescription('');
            setSelectedIcon('AcademicCapIcon');
            setError('');
            
        } catch (err) {
            setError(err.message || 'Server error');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">
                {initialValues ? 'Edit Category' : 'Add New Category'}
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Select Icon:</label>
                    <IconSelector selectedIcon={selectedIcon} onSelect={setSelectedIcon} />
                </div>
                <button
                    type="submit"
                    className="w-full bg-custom-cyan2 text-white py-2 rounded-md hover:bg-custom-cyan focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {initialValues ? 'Update Category' : 'Add Category'}
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
