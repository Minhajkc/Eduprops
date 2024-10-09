import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchCourseCategory } from '../../Services/studentService';
import * as HeroIcons from '@heroicons/react/24/outline';
import Footer from '../Components/Layout/Footer';
import { useSelector } from 'react-redux';
import { Pagination, Input, Spin } from 'antd';

const CoursePageStudents = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [setError] = useState('');
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 4;

  const ads = useSelector((state) => state.student.ads);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await searchCourseCategory('');
        setCategories(response);
        setFilteredCategories(response);
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [searchTerm, categories]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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

  const homepageAd3 = getAdByPosition('coursepage');

  const getIcon = (iconName) => {
    const IconComponent = HeroIcons[iconName];
    return IconComponent ? (
      <div className="flex justify-center items-center mb-4">
        <IconComponent className="h-12 w-12 text-[#00b8d4]" />
      </div>
    ) : null;
  };

  const renderCategories = () => {
    const startIndex = (currentPage - 1) * categoriesPerPage;
    const endIndex = startIndex + categoriesPerPage;
    const currentCategories = filteredCategories.slice(startIndex, endIndex);

    return currentCategories.map((category) => (
      <div
        key={category._id}
        className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
      >
        {getIcon(category.icon)}
        <h2
          className="lg:text-xl font-bold mb-2 hover:text-custom-cyan duration-100 cursor-pointer"
          onClick={() => navigate(`/courses/category/${category._id}`)}
        >
          {category.name}
        </h2>
        <p className="text-sm text-gray-700 mb-4">Explore courses in {category.name}</p>
        <Link
          to={`/courses/category/${category._id}`}
          className="bg-custom-cyan text-white text-xs p-2 lg:px-4 lg:py-2 rounded-full inline-flex items-center justify-center hover:bg-[#0099b3] transition-colors duration-300 lg:text-sm"
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
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 font-roboto">
      {/* Header Section */}
      <div className=" rounded-lg  mb-6">
        <div className="flex flex-col items-center w-full">
          <div className="bg-custom-cyan2 rounded-lg p-10 w-full text-center">
            <h1 className="text-3xl text-white font-bold mb-4">Select Your Fav Category</h1>
            <Input
              placeholder="Want to learn?"
              onChange={handleSearch}
              value={searchTerm}
              style={{ maxWidth: '500px' }}
              className="w-full rounded-2xl"
              size="large"
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-1 text-center align-center items-center sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-4 gap-6 mb-6">
        {renderCategories()}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6 mb-5">
        <Pagination
          current={currentPage}
          pageSize={categoriesPerPage}
          total={filteredCategories.length}
          onChange={handlePaginationChange}
          showSizeChanger={false}
        />
      </div>

      {/* Advertisement Section */}
      <div className="bg-[#00b8d4] h-auto lg:h-40 rounded-lg flex flex-col lg:flex-row justify-between items-center p-4">
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

export default CoursePageStudents;