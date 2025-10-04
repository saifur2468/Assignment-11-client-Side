import React, { useState, useEffect } from "react";
import img1 from '../../assets/img/paris_canal_mirpur_020224_50.jpg'
import img2 from '../../assets/img/pngtree-volunteer-service-activity-webpage-login-yellow-banner-png-image_6688904.jpg'
import img3 from '../../assets/img/gettyimages-1543945056-612x612.jpg'
import img4 from '../../assets/img/p-PHL7810 1280x853.jpg'
import ImpactSectionMarquee from "../ImpactSectionMarquee/ImpactSectionMarquee";

import FAQSection from "../FAQ/FAQSection";
import UpcomingPosts from "../UpcomingPosts";
const Hero = () => {
const images = [img1,img2,img3,img4];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="w-full h-[650px] relative overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>


        <UpcomingPosts></UpcomingPosts>  
      <ImpactSectionMarquee></ImpactSectionMarquee>

      <FAQSection></FAQSection>
    </div>
  );
};

export default Hero;
