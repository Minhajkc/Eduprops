import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourseCategory } from '../../Services/studentService';
import * as HeroIcons from '@heroicons/react/24/outline';



const CoursePageStudents = () => {
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

  const getIcon = (iconName) => {
    const IconComponent = HeroIcons[iconName];
    return IconComponent ? (
      <div className="flex justify-center items-center mb-4">
        <IconComponent className="h-12 w-12 text-[#00b8d4]" />
      </div>
    ) : null;
  };

  return (
    <div className="bg-white p-6 font-roboto">
      {/* Header Section */}
      <div className="bg-[#a0e4e9] rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Select Your Fav Courses</h1>
            <div className="flex items-center bg-white rounded-full p-1 w-64">
              <input type="text" placeholder="Want to learn?" className="bg-transparent outline-none px-3 flex-grow" />
              <button className="bg-[#a0e4e9] text-white px-3 py-1 rounded-full">Explore</button>
            </div>
          </div>
          <img src="/path-to-your-image.png" alt="Learning" className="w-32 h-32" />
        </div>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-1 text-center align-center items-center sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 gap-6 mb-6">
        {categories.map((category) => (
          <div key={category._id} className="p-6 rounded-lg shadow-lg  hover:shadow-xl hover:bg-cyan-100 transition-all duration-300 text-center">
            {getIcon(category.icon)}
            <h2 className="lg:text-xl font-bold mb-2">{category.name}</h2>
            <p className="text-sm text-gray-700 mb-4">Explore courses in {category.name}</p>
            <Link 
              to={`/courses/category/${category._id}`} 
              className="bg-[#00b8d4] text-white px-6 py-2 rounded-full inline-flex items-center justify-center hover:bg-[#0099b3] transition-colors duration-300"
            >
              View Courses
             
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mb-1 ml-3 font-bold">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>

            </Link>
          </div>
        ))}
      </div>


     

      <div className="bg-[#00b8d4] h-20 rounded-lg"></div>
    </div>
  );
};

export default CoursePageStudents;
