import React from 'react';
import { Facebook, Twitter, Linkedin, Github, Dribbble } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Courses',
      items: ['Classroom courses', 'Virtual classroom courses', 'E-learning courses', 'Video Courses', 'Offline Courses'],
    },
    {
      title: 'Community',
      items: ['Learners', 'Partners', 'Developers', 'Transactions', 'Blog', 'Teaching Center'],
    },
    {
      title: 'Quick links',
      items: ['Home', 'Professional Education', 'Courses', 'Admissions', 'Testimonial', 'Programs'],
    },
    {
      title: 'More',
      items: ['Press', 'Investors', 'Terms', 'Privacy', 'Help', 'Contact'],
    },
  ];

  return (
    <footer className="bg-white mt-5 lg:p-16 pb-12 text-gray-600 font-roboto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <img src="/path-to-your-logo.png" alt="Eduprops" className="mb-4 h-8" />
            <p className="text-sm mb-4">Eduvi is a registered trademark of Eduvi.co</p>
            <div className="flex space-x-4">
              <Facebook size={20} />
              <Twitter size={20} />
              <Linkedin size={20} />
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="text-sm">
                    <a href="#" className="hover:text-teal-500 transition duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2022 Ed-circle. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Twitter size={20} />
            <Linkedin size={20} />
            <Facebook size={20} />
            <Github size={20} />
            <Dribbble size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;