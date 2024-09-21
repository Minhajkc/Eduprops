import React from 'react';
import Hero from '../Components/Layout/Hero';
import OurServices from '../Components/Layout/OurServices';
import MentorBanner from '../Components/Layout/MentorBanner';
import CourseHomePageView from '../Components/Layout/CourseHomePageView';
import MentorCarousel from '../Components/Layout/MentorCarousel';
import StudentReviews from '../Components/Layout/StudentReviews';
import Subscription from '../Components/Layout/Subscription';



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


  </>
  );
};

export default HomePage;
