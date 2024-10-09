import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addCourseToCart, getCategoryCoursesByIdSort } from '../../Services/studentService';
import { FaFilter, FaCartArrowDown, FaArrowLeft } from 'react-icons/fa';
import { CiClock2 } from "react-icons/ci";
import Footer from '../Components/Layout/Footer';
import { useSelector } from 'react-redux';
import { Pagination, Input,  Spin } from 'antd';

const { Search } = Input;

const CourseCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price-asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ads = useSelector((state) => state.student.ads);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCategoryCoursesByIdSort(id, '', sortOption);
        setCourses(response);
        setFilteredCourses(response);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id, sortOption]);

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [searchTerm, courses]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setIsModalOpen(false);
  };

  const handleCardClick = (courseId) => {
    navigate(`/courses/category/selectedcourse/${courseId}`);
  };

  const handleCart = async (id) => {
    try {
      await addCourseToCart(id);
    } catch (e) {
      setError('Failed to add course to cart');
    }
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const getAdByPosition = (position) => {
    return ads.find(ad => ad.position === position) || { 
      title: 'No Ad Available',
      content: 'No content available for this position.',
      image: "/api/placeholder/300/200",
      link: '#'
    };
  };

  const homepageAd3 = getAdByPosition('coursecategorypage');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Spin size='large' />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  return (
    <div className="bg-white p-6 font-roboto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <button
          onClick={() => navigate('/courses')}
          className="text-white hover:bg-cyan-900 mb-2 duration-300 flex items-center px-4 py-2 rounded-3xl border bordercustom-cyan2 bg-custom-cyan2"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Search
            placeholder="Search courses"
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00b8d4] text-white px-4 py-2 text-sm rounded-full inline-flex items-center space-x-2 hover:bg-[#0099b3] transition-colors duration-300"
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

      {/* Courses Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedCourses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 text-indigo-800 cursor-pointer" onClick={() => handleCardClick(course._id)}>
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center">
                  <CiClock2 className="mr-1" />
                  {course.duration} hours
                </span>
                <span className="text-lg font-bold text-custom-cyan2">₹{course.price}</span>
              </div>
              <button
                onClick={() => handleCart(course._id)}
                className="mt-4 w-full bg-custom-cyan text-white py-2 rounded-full hover:bg-custom-cyan2 transition-colors duration-300 flex items-center justify-center"
              >
                <FaCartArrowDown className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={coursesPerPage}
          total={filteredCourses.length}
          onChange={handlePaginationChange}
        />
      </div>

      {/* Advertisement Section */}
      <div className="bg-[#00b8d4] h-auto lg:h-30 rounded-lg mt-5 flex flex-col lg:flex-row justify-between items-center p-4">
        {/* Left Section: Advertisement */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-black">
          <p className='text-xs mb-2'>Ads</p>
          <a href={homepageAd3.link} target="_blank" rel="noopener noreferrer" className="w-full">
            <img src={homepageAd3.image} alt={homepageAd3.title} className="w-full h-20 lg:h-35 object-cover rounded-lg" />
            <h3 className="text-sm font-bold mt-2 text-center">{homepageAd3.title}</h3>
            <a className="text-xs text-blue-800 hover:border-b-2 border-blue-500 font-bold block text-center">{homepageAd3.link}</a>
          </a>
        </div>

        {/* Right Section: Contact Info */}
        <div className="w-full lg:w-1/2 pl-5 text-center lg:text-left mt-4 lg:mt-0 flex flex-col justify-center items-center lg:items-start">
          <h3 className="text-lg font-bold text-white">Make Your Advertisement Here</h3>
          <p className="text-sm text-white">Contact us to showcase your advertisement. Reach thousands of potential customers!</p>
          <p className="text-sm text-white font-bold mt-2">Call: 703-493-6080</p>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default CourseCategoryPage;