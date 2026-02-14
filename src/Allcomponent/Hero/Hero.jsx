import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from '../../assets/img/paris_canal_mirpur_020224_50.jpg'
import img2 from '../../assets/img/pngtree-volunteer-service-activity-webpage-login-yellow-banner-png-image_6688904.jpg'
import img3 from '../../assets/img/gettyimages-1543945056-612x612.jpg'
import img4 from '../../assets/img/p-PHL7810 1280x853.jpg'

import ImpactSectionMarquee from "../ImpactSectionMarquee/WhatMakesUsDifferent";
import FAQSection from "../FAQ/FAQSection";
import UpcomingPosts from "../UpcomingPosts";
import EventCard from "../ImpactSectionMarquee/EventCard";
import Contact from "../Contact";

const Hero = () => {
  const images = [img1,img2,img3,img4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

 
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div>
      {/* Image Slider */}
      <div className="w-full h-[650px] relative overflow-hidden">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`slide-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full absolute top-0 left-0"
          />
        ))}
      </div>

      
      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <UpcomingPosts />
      </motion.div>

      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <ImpactSectionMarquee />
      </motion.div>

      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <EventCard />
      </motion.div>

      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <FAQSection />
      </motion.div>

      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Contact />
      </motion.div>
    </div>
  );
};

export default Hero;
