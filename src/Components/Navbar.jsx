import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white font-roboto">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-custom-cyan mr-6">
            <img src="Logoblack2.png" alt="Logo" className="w-15 h-12" />
          </div>
          <div className="hidden md:block relative flex-grow max-w-md mx-4">
            <input
              type="text"
              placeholder="Want to learn?"
              className="w-full p-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm bg-custom-cyan text-white px-3 py-1 rounded-full hover:bg-cyan-600">
              Explore
            </button>
          </div>

          {/* Navigation Links and Buttons */}
          <div className="hidden lg:flex lg:items-center lg:w-auto">
            <div className="text-sm ">
            <Link to="/" className="text-gray-700 hover:text-cyan-500 px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-cyan-500 px-3 py-2 text-sm font-medium">About</Link>
            <Link to="/courses" className="text-gray-700 hover:text-cyan-500 px-3 py-2 text-sm font-medium">Courses</Link>
            <Link to="/contact" className="text-gray-700 hover:text-cyan-500 px-3 py-2 text-sm font-medium">Contact</Link>
            <Link to="/faq" className="text-gray-700 hover:text-cyan-500 px-3 py-2 text-sm font-medium">FAQ</Link>
            </div>
            <div>
              <Link to="/signin" className="inline-block text-sm px-4 py-2 leading-none border rounded text-custom-cyan border-cyan-500 hover:border-transparent hover:text-white hover:bg-cyan-500 mt-4 lg:mt-0 mr-2">Sign In</Link>
              <Link to="/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-custom-cyan hover:bg-cyan-600 mt-4 lg:mt-0">Create free Account</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 text-custom-cyan hover:text-cyan-600 transition-transform duration-300 transform active:scale-95"
          >
            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
        </div>

 
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <div className="mb-4 md:hidden">
              <input
                type="text"
                placeholder="Want to learn?"
                className="w-full p-2 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button className="mt-2 w-full bg-custom-cyan text-white px-3 py-1 rounded-full hover:bg-cyan-600 text-sm">
                Explore
              </button>
            </div>
            <Link to="/" className="block text-gray-700 hover:text-cyan-500 py-2 " onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block text-gray-700 hover:text-cyan-500 py-2" onClick={() => setIsMenuOpen(false)}>About us</Link>
            <Link to="/courses" className="block text-gray-700 hover:text-cyan-500 py-2"onClick={() => setIsMenuOpen(false)}>Courses</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-cyan-500 py-2"onClick={() => setIsMenuOpen(false)}>Contact us</Link>
            <Link to="/faq" className="block text-gray-700 hover:text-cyan-500 py-2"onClick={() => setIsMenuOpen(false)}>FAQ's</Link>
            <div className="mt-4 flex flex-col space-y-2">
              <Link to="/signin" className="bg-transparent text-custom-cyan px-4 py-2 rounded-lg text-center hover:bg-cyan-500 hover:text-white border border-cyan-500" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" className="bg-custom-cyan text-white px-4 py-2 rounded-lg text-center hover:bg-cyan-600"onClick={() => setIsMenuOpen(false)}>Create free Account</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;