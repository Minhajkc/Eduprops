import React,{useEffect} from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const ServiceCard = ({ icon, title, description, color, textColor }) => (
    <motion.div
      className={`${color} rounded-lg p-6 shadow-md`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-custom-cyan2 mb-4">{icon}</div>
      <h3 className={`${textColor} text-xl font-semibold mb-2`}>{title}</h3>
      <p className={`${textColor} text-sm mb-4`}>{description}</p>
    </motion.div>
  );

const OurServices = () => {
    const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.2,    
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
    return (
        <div className="container mx-auto px-4 pb-10 font-roboto">
      <h2 className="text-center text-cyan-400 text-sm font-semibold mb-4">Our Services</h2>
      <h1 className="text-center text-3xl md:text-4xl font-bold mb-12 max-w-2xl mx-auto">
        Fostering a playful & engaging learning environment
      </h1>
      
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ duration: 0.6, delayChildren: 0.3, staggerChildren: 0.2 }}
      >
        <ServiceCard
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
          title="Interaction Design"
          description="Lessons on design that cover the most recent developments."
          color="bg-custom-cyan"
          textColor="text-white"

        />
        <ServiceCard
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          title="UX Design Course"
          description="Classes in development that cover the most recent advancements in web."
          color="bg-white"
          textColor="text-black"
        />
        <ServiceCard
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
          title="User Interface Design"
          description="User Interface Design courses that cover the most recent trends"
          color="bg-white"
          textColor="text-black"
        />
      </motion.div>
    </div>
  );
};

export default OurServices;