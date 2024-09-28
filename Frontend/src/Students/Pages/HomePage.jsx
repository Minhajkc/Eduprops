import React from 'react';
import Hero from '../Components/Layout/Hero';
import OurServices from '../Components/Layout/OurServices';
import MentorBanner from '../Components/Layout/MentorBanner';
import CourseHomePageView from '../Components/Layout/CourseHomePageView';
import MentorCarousel from '../Components/Layout/MentorCarousel';
import StudentReviews from '../Components/Layout/StudentReviews';
import Subscription from '../Components/Layout/Subscription';
import FAQSection from '../Components/Layout/FAQSection';
import SubscriptionUpdate from '../Components/Layout/SubscriptionUpdate';
import Footer from '../Components/Layout/Footer';




const HomePage = () => {
 
  return (
  <>
<Hero/>
<OurServices/>
<CourseHomePageView/>
<MentorBanner/>
<MentorCarousel/>
<StudentReviews/>
<Subscription/>
<FAQSection/>
<SubscriptionUpdate/>
<Footer/>


  </>
  );
};

export default HomePage;
