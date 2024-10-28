import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSelector } from 'react-redux';

const faqData = [
  { id: '01', question: 'How do I register for a course?', answer: 'You can register for a course through our website by filling out the registration form available on the course page.' },
  { id: '02', question: 'Is there an age limit for enrollment?', answer: 'There is no age limit for enrollment. We welcome learners of all ages.' },
  { id: '03', question: 'Will course materials be available after completion?', answer: 'Yes, all course materials will remain accessible to you even after you complete the course.' },
  { id: '04', question: 'What should I do if I encounter difficulties?', answer: 'If you encounter difficulties, you can contact our support team via email or use the live chat feature on our website.' },
  { id: '05', question: 'How can I apply for financial aid?', answer: 'We offer various financial aid options. Please visit our financial aid page on the website for more information.' },
  { id: '06', question: 'Can I access the course from any device?', answer: 'Yes, our courses are accessible on any device, including smartphones, tablets, and computers.' },
  { id: '07', question: 'How long do I have to complete the course?', answer: 'The course is self-paced, so you can complete it according to your own schedule.' },
  { id: '08', question: 'Is there a certificate of completion?', answer: 'Yes, you will receive a certificate of completion after successfully finishing the course.' },
];

const FAQItem = ({ item, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button className="flex justify-between items-center w-full text-left" onClick={toggleOpen}>
        <span className="text-lg font-medium">{item.question}</span>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{item.answer}</p>}
    </div>
  );
};

const FAQSection = () => {
  const [openId, setOpenId] = useState('01');
  const ads = useSelector((state) => state.student.ads);

  // Function to get an ad by its position
  const getAdByPosition = (position) => {
    return ads.find(ad => ad.position === position) || { 
      title: 'No Ad Available',
      content: 'No content available for this position.',
      image: "/api/placeholder/300/200",
      link: '#'
    };
  };

  // Retrieve ad for 'homepage3'
  const homepageAd3 = getAdByPosition('homepage3');

  return (
    <div className="mx-auto px-4 py-12 font-roboto">
      <h1 className="text-3xl font-bold text-center mb-2">FAQ's</h1>
      <p className="text-center text-gray-600 mb-8" id="faqsection">
        On Weekend UX, instructors from all over the world instruct millions of students.
        <br />
        We offer the knowledge and abilities.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* FAQ Introduction and Ad Section */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or doubts, please contact us at +6288 999 222 333.
          </p>
          
          {/* Display Ad for Homepage3 */}
          <div className="h-64 w-full flex items-center justify-center text-black p-4">
            <p className='text-xs'>Ads</p>
            <a href={homepageAd3.link} target="_blank" rel="noopener noreferrer">
              <img src={homepageAd3.image} alt={homepageAd3.title} className="w-full h-40 object-cover" />
              <h3 className="text-sm font-bold">{homepageAd3.title}</h3>
              <a className="text-xs text-blue-800 hover:border-b-2 border-blue-500 font-bold">{homepageAd3.link}</a>
            </a>
          </div>
        </div>
        
        {/* FAQ List */}
        <div className="md:w-2/3">
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              toggleOpen={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
