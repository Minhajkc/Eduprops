import React from 'react';
import { Facebook, Twitter, Linkedin, Github, Dribbble } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  const footerSections = [
    {
      title: 'Courses',
      items: [
        { name: 'Classroom courses', path: '/courses' },
        { name: 'Virtual classroom courses', path: '/courses' },
        { name: 'E-learning courses', path: '/courses' },
        { name: 'Video Courses', path: '/courses' },
        { name: 'Offline Courses', path: '/courses' },
      ],
    },
    {
      title: 'Community',
      items: [
       
        { name: 'Teaching Center', path: '/MentorApply' },
      ],
    },
    {
      title: 'Quick links',
      items: [
        { name: 'Home', path: '/' },
        { name: 'Professional Education', path: '/courses' },
        { name: 'Courses', path: '/courses' },
        { name: 'Programs', path: '/courses' },
      ],
    },
    {
      title: 'More',
      items: [
   ,
        { name: 'Help', path: '/About' },
        { name: 'Contact', path: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-white mt-5 lg:p-16 pb-12 text-gray-600 font-roboto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <img src="src/assets/images/Logoblack2.png" alt="Eduprops" className="mb-4 h-8" />
            <p className="text-sm mb-4">Eduprops is a registered trademark of Eduprops.com</p>
            <div className="flex space-x-4">
        
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name} className="text-sm">
                    <Link to={item.path} className="hover:text-teal-500 transition duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2022 Eduprops. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="src/assets/images/Logoblack2.png" alt="Eduprops" className="mb-4 h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
