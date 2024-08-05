import React from 'react';
import { FaGraduationCap, FaLaptop, FaCertificate, FaClock, FaBriefcase, FaUsers, FaPiggyBank } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="font-roboto bg-gradient-to-b to-white">
      <div className="container mx-auto px-4 py-20">
        {/* About Us Section */}
        <section className="mb-20">
  <h2 className="text-4xl font-bold text-center mb-10 text-custom-cyan2">ABOUT US</h2>
  <div className="mx-auto bg-white rounded-lg overflow-hidden flex flex-col lg:flex-row">
    <div className="lg:w-1/3">
      <img src="SignUpimage.png" alt="About Us" className="w-full h-full object-cover"/>
    </div>
    <div className="lg:w-2/3 p-8 lg:p-12 flex flex-col justify-center">
      <h1 className="text-2xl lg:text-5xl font-semibold mb-6 text-custom-cyan">
        Providing The Best Opportunities To Students Around The Globe
      </h1>
      <p className="text-gray-600 leading-relaxed">
        EduProps is a revolutionary e-learning platform dedicated to empowering students with the skills and knowledge they need to thrive in the digital age. Our mission is to make high-quality education accessible to everyone, everywhere, breaking down barriers and opening doors to new opportunities.
      </p>
    </div>
  </div>
</section>


        {/* Features Section */}
        <section className="mb-20">
          <div className="bg-cyan-100  rounded-xl p-10">
            <h2 className="text-4xl font-bold text-center mb-10 text-custom-cyan2">Features</h2>
            <p className="text-center mb-12 text-xl text-custom-cyan">
              We are continuously innovating to provide you with the best learning experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { icon: FaLaptop, title: "Interactive Courses", description: "Engage with our interactive lessons and quizzes designed to enhance your learning experience." },
                { icon: FaGraduationCap, title: "Expert Instructors", description: "Learn from industry professionals and academic experts in various fields." },
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow-xl p-8 transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl flex items-start">
                  <feature.icon className="text-4xl mr-6 text-custom-cyan flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-custom-cyan2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-10 text-custom-cyan2">Our Benefits</h2>
          <p className="text-center mb-12 text-xl text-custom-cyan">
            Join EduProps and unlock a world of opportunities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaClock, title: "Flexible Learning", description: "Study at your own pace, anytime and anywhere." },
              { icon: FaBriefcase, title: "Career Support", description: "Access career counseling and job placement assistance." },
              { icon: FaUsers, title: "Networking Opportunities", description: "Connect with peers and professionals in your field of study." },
              { icon: FaPiggyBank, title: "Affordable Pricing", description: "High-quality education at competitive prices with flexible payment options." }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl p-6 transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center">
                <benefit.icon className="text-4xl mb-4 text-custom-cyan" />
                <h3 className="text-xl font-semibold mb-2 text-custom-cyan2">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-custom-cyan text-white py-16 rounded-xl">
          <h2 className="text-3xl font-bold mb-6">Ready to start your learning journey?</h2>
          <button className="bg-white text-custom-cyan font-bold py-3 px-8 rounded-full text-xl hover:bg-gray-100 transition duration-300">
            Explore Courses
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;