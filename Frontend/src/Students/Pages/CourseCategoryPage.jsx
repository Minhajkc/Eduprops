import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addCourseToCart, getCategoryCoursesById } from '../../Services/studentService';
import { FaSearch, FaFilter, FaCartArrowDown, FaArrowLeft } from 'react-icons/fa';
import { CiClock2 } from "react-icons/ci";


const CourseCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price-asc'); // Sort by price ascending by default
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCategoryCoursesById(id);
        setCourses(response);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedCourses = [...courses].sort((a, b) => {
      if (option === 'price-asc') {
        return a.price - b.price;
      } else if (option === 'price-desc') {
        return b.price - a.price;
      } else if (option === 'title-asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setCourses(sortedCourses);
    setIsModalOpen(false); // Close the modal after sorting
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (courseId) => {
    navigate(`/courses/category/selectedcourse/${courseId}`); 
  };

  const handleCart = async(id)=>{
       try{
         await addCourseToCart(id);
       }catch(e){
        setError('Failed to add course to cart');
       }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-6 font-roboto">
      <div className="flex flex-col sm:flex-row justify-between items-center  mb-6">
      <button
                    onClick={() => navigate('/courses')}
                    className="text-white hover:bg-cyan-900 mb-2 duration-300 flex items-center px-4 py-2 rounded-3xl border  bordercustom-cyan2 bg-custom-cyan2  "
                >
                    <FaArrowLeft className="mr-2" /> Back
                </button>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center bg-gray-100 rounded-full p-2">
            <FaSearch className="text-gray-500 ml-2" />
            <input
              type="text"
              placeholder="Search courses"
              value={searchTerm}
              onChange={handleSearch}
              className="bg-transparent outline-none px-3 text-gray-700 flex-grow"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00b8d4] text-white px-4 py-2 rounded-full inline-flex items-center space-x-2 hover:bg-[#0099b3] transition-colors duration-300"
          >
            <FaFilter />
            <span>Sort By</span>
          </button>
        </div>
      </div>

      {/* Modal for Sorting */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 p-10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Sort Courses</h2>
            <button
              onClick={() => handleSort('price-asc')}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleSort('price-desc')}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Price: High to Low
            </button>
            <button
              onClick={() => handleSort('title-asc')}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Title: A to Z
            </button>
            <button
              onClick={() => handleSort('title-desc')}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Title: Z to A
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-full w-full text-center hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredCourses.map((course) => (
    <div
      key={course._id}
      className="bg-slate-100 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 relative flex flex-col"
     
    >
      <img src={course.image} alt={course.title} className="w-full  h-32 object-cover rounded-t-lg mb-4" />
      <div className="flex flex-col flex-grow p-2">
        <h2 className="text-lg font-bold mb-1  cursor-pointer text-custom-cyan2"  onClick={() => handleCardClick(course._id)}>{course.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs text-gray-700">{course.description}</p>
          <p className="text-xs text-gray-700 flex items-center">
            <CiClock2 className="mr-1" />
            {course.duration} Hours
          </p>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-md font-bold text-gray-900">₹{course.price}</p>
          <button className="text-custom-cyan hover:text-custom-cyan2 transition-colors duration-300" onClick={() => handleCart(course._id)}>
            <FaCartArrowDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default CourseCategoryPage;
