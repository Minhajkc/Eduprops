import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importing a back arrow icon from react-icons
import { AdminInstance } from '../../Services/apiInstances';
import CategorizedCourses from '../Components/Common/CategorizedCourses';


const CategoryPage = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For navigation

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-white rounded-lg mx-auto w-full ">
            {/* Container for Back Button and Title */}
            <div className="flex items-center  ml-10 ">
                <button
                    onClick={() => navigate('/admin/courses')}
                    className="text-white hover:bg-custom-cyan flex items-center px-4 py-2 rounded-lg border  bordercustom-cyan2 bg-custom-cyan2  shadow-lg"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </button>
            </div>
            {/* Centered Course Name and Description */}
            <div className="text-center ">
                <h1 className="text-2xl sm:text-5xl font-semibold text-custom-cyan mb-2">{category?.name}</h1>
                <p className="text-gray-600 text-lg">{category?.description}</p>
            </div>
            <CategorizedCourses categoryId={categoryId} />
        </div>
    );
};

export default CategoryPage;
