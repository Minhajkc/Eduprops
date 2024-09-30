import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSelector } from 'react-redux';

const faqData = [
  { id: '01', question: 'Apakah kursus ini benar-benar gratis?', answer: 'Kursus yang disediakan bisa diakses gratis untuk menunjang kebutuhan dalam bidang kependidikan.' },
  { id: '02', question: 'Untuk siapa kursus ini?', answer: 'Kursus ini ditujukan untuk semua orang yang ingin belajar UI/UX design, baik pemula maupun yang sudah memiliki pengalaman.' },
  { id: '03', question: 'Apakah kursus ini bersertifikat?', answer: 'Ya, setelah menyelesaikan kursus, Anda akan menerima sertifikat kelulusan yang dapat digunakan untuk meningkatkan CV Anda.' },
  { id: '04', question: 'Sampai kapan kursus ini berakhir?', answer: 'Kursus ini bersifat self-paced, jadi Anda dapat menyelesaikannya sesuai dengan kecepatan belajar Anda sendiri.' },
  { id: '05', question: 'Apakah ada penyaluran kerja setelah lulus?', answer: 'Kami memiliki program kerjasama dengan berbagai perusahaan untuk membantu lulusan kami mendapatkan pekerjaan, namun tidak ada jaminan penempatan kerja.' },
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
    <div className="mx-auto px-4 py-12 font-roboto" >
      <h1 className="text-3xl font-bold text-center mb-2" >FAQ's</h1>
      <p className="text-center text-gray-600 mb-8"  id="faqsection">
        On Weekend UX, instructors from all over the world instruct millions of students.
        <br />
        We offer the knowledge and abilities.
      </p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* FAQ Introduction and Ad Section */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-4">
            Masih bingung atau ragu? Hubungi kami di nomor +6288 999 222 333
          </p>
          
          {/* Display Ad for Homepage3 */}
          <div className=" h-64 w-full flex items-center justify-center text-black  p-4">
            <p className='text-xs'>Ads</p>
            <a href={homepageAd3.link} target="_blank" rel="noopener noreferrer">
              <img src={homepageAd3.image} alt={homepageAd3.title} className="w-full h-40 object-cover " />
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
