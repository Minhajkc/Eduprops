import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as HeroIcons from '@heroicons/react/24/outline';
import { getCourseCategory } from '../../../Services/studentService'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MdExplore } from "react-icons/md";
// Adjust the import path as needed

const CourseHomePageView = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCourseCategory();
        // Take the first 4 categories
        setCategories(response.slice(0, 4));
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  // Function to get the icon component based on the icon name
  const getIcon = (iconName) => {
    const IconComponent = HeroIcons[iconName];
    return IconComponent ? (
      <div className="flex justify-center items-center mb-4">
        <IconComponent className="h-12 w-12 text-[#00b8d4]" />
      </div>
    ) : null;
  };

  return (
    <div className="container mx-auto px-4 py-8 font-roboto">
      <div className="text-center mb-8">
        <h3 className="text-custom-cyan text-sm font-semibold mb-2">Our Courses</h3>
        <h2 className="text-3xl font-bold mb-4">Course Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn UI-UX Design skills with weekend UX. The latest online
          learning system and material that help your knowledge growing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
          >
            {getIcon(category.icon)}
            <h2
              className="text-lg lg:text-xl font-bold mb-2 hover:text-[#00b8d4] duration-100 cursor-pointer"
              onClick={() => navigate(`/courses/category/${category._id}`)}
            >
              {category.name}
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              {category.description}
            </p>
            <Link
              to={`/courses/category/${category._id}`}
              className="bg-custom-cyan text-white px-4 py-2 rounded-full inline-flex items-center justify-center hover:bg-[#0099b3] transition-colors duration-300 text-sm"
            >
              View Courses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center justify-center flex ">
        <button 
          className="bg-gray-100 border-2 text-gray-700 px-6 py-2 rounded-full hover:bg-[#0099b3] hover:text-white transition-colors duration-500 flex items-center justify-center space-x-2"
          onClick={() => navigate('/courses')}
        >
          Explore All Programs
          <MdExplore className='ml-2' />
        </button>
      </div>
    </div>
  );
};

export default CourseHomePageView;