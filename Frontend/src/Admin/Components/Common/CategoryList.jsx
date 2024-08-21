// components/Common/CategoryList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CogIcon } from '@heroicons/react/24/outline';
import { getCourseCategory } from '../../../Services/adminService';



const iconMap = {
    AcademicCapIcon: <AcademicCapIcon className="h-12 w-12 text-blue-500" />,
    BookOpenIcon: <BookOpenIcon className="h-12 w-12 text-green-500" />,
    BriefcaseIcon: <BriefcaseIcon className="h-12 w-12 text-red-500" />,
    CogIcon: <CogIcon className="h-12 w-12 text-yellow-500" />
};

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCourseCategory(); 
                setCategories(response);
            } catch (err) {
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-white rounded-lg  w-full mx-auto">
            <h2 className="text-4xl ml-4 font-semibold mb-6">Categories</h2>
            <div className="flex flex-wrap gap-6 ">
                {categories.map((category) => (
                    <div
                        key={category._id}
                        className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md w-60 text-center"
                    >
                        <div className="flex-shrink-0 mb-4">
                            {iconMap[category.icon] || <div className="h-12 w-12 text-gray-500">No Icon</div>}
                        </div>
                        <div>
                            <Link to={`/admin/courses/${category._id}`}>
                                <h3 className="text-lg font-semibold text-blue-600 hover:underline">{category.name}</h3>
                            </Link>
                            {category.description && <p className="text-gray-700 mt-2">{category.description}</p>}
                           
                        </div>
                      
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
