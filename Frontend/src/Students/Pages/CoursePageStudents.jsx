import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { getCourseCategory } from '../../Services/studentService';
import * as HeroIcons from '@heroicons/react/24/outline';



const CoursePageStudents = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
   const navigate = useNavigate()
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
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="bg-white p-6 font-roboto">
    {/* Header Section */}
    <div className="bg-[#edefef] rounded-lg p- mb-6">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
      <div className="bg-custom-cyan2 rounded-lg p-10 w-full max-w text-center">
  <h1 className="text-3xl text-white font-bold mb-4">Select Your Fav Category</h1>
  <div className="flex justify-center">
    <div className="flex items-center bg-white rounded-full lg:p-1 w-full max-w-lg relative">
      <input
        type="text"
        placeholder="Want to learn?"
        className="bg-transparent outline-none px-5 py-1 lg:text-lg flex-grow"
        onChange={handleSearch}
        value={searchTerm}
      />
      <span className="absolute right-4 text-gray-500">
        <i className="fas fa-search"></i>
      </span>
    </div>
  </div>
</div>

        {/* Image hidden on small screens */}
      
      </div>
    </div>
  
    {/* Categories Section */}
    <div className="grid grid-cols-1 text-center align-center items-center sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 gap-6 mb-6">
      {filteredCategories.map((category) => (
        <div
          key={category._id}
          className="p-6 rounded-lg shadow-lg hover:shadow-xl  transition-all duration-300 text-center"
        >
          {getIcon(category.icon)}
          <h2 className="lg:text-xl font-bold mb-2 hover:text-custom-cyan duration-100 cursor-pointer "  onClick={() => navigate(`/courses/category/${category._id}`)}>{category.name}</h2>
          <p className="text-sm text-gray-700 mb-4">Explore courses in {category.name}</p>
          <Link
            to={`/courses/category/${category._id}`}
            className="bg-[#00b8d4] text-white px-6 py-2 rounded-full inline-flex items-center justify-center hover:bg-[#0099b3] transition-colors duration-300"
          >
            View Courses
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 mb-1 ml-3 font-bold"
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
  
    <div className="bg-[#00b8d4] h-20 rounded-lg"></div>
  </div>
  
  );
};

export default CoursePageStudents;
