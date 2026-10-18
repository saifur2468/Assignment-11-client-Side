import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake } from "lucide-react";

import img1 from "../../assets/img/paris_canal_mirpur_020224_50.jpg";
import img2 from "../../assets/img/medium-shot-people-with-food-donations.jpg";
import img3 from "../../assets/img/men-women-help-each-other-collect-garbage.jpg";
import img4 from "../../assets/img/p-PHL7810 1280x853.jpg";

import FAQSection from "../FAQ/FAQSection";
import UpcomingPosts from "../UpcomingPosts";
import EventCard from "../ImpactSectionMarquee/EventCard";
import Contact from "../Contact";
import VolunteerAboutSection from "../VolunteerAboutSection";
import VolunteerMarqueeSection from "../ImpactSectionMarquee/WhatMakesUsDifferent";

const Hero = () => {
  const slides = [
    {
      img: img1,
      title: "Transform Lives Together",
      subtitle: "Join thousands of volunteers driving real impact across communities.",
    },
    {
      img: img2,
      title: "Food & Essential Support Drive",
      subtitle: "Connecting compassionate volunteers with those in urgent need.",
    },
    {
      img: img3,
      title: "Clean & Sustainable Environment",
      subtitle: "Taking direct action today for a healthier and greener future.",
    },
    {
      img: img4,
      title: "Emergency Response & Aid",
      subtitle: "Rapid action teams serving during critical community needs.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      
      {/* Clean & Modern Hero Section */}
      <section className="relative w-full h-[550px] sm:h-[600px] lg:h-[680px] overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentIndex].img}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover object-center"
            />
            {/* Left-to-Right Overlay for clean contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Text Content (Left-Aligned) */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl text-left space-y-5">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Make an Impact</span>
            </motion.div>

            <motion.h1
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
            >
              {slides[currentIndex].title}
            </motion.h1>

            <motion.p
              key={`subtitle-${currentIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-lg font-normal leading-relaxed"
            >
              {slides[currentIndex].subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                to="/posts"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-600/25 transition-all duration-200 active:scale-95"
              >
                <span>Explore Posts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/add-volunteer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/20 backdrop-blur-md transition-all duration-200 active:scale-95"
              >
                Create Need
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Carousel Indicators (Left-Aligned) */}
        <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8 z-20 flex gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? "w-6 bg-emerald-500" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Other Sections */}
      <VolunteerMarqueeSection />

      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        <UpcomingPosts />
      </motion.div>

      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        <VolunteerAboutSection />
      </motion.div>

      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        <EventCard />
      </motion.div>

      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        <FAQSection />
      </motion.div>

      <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        <Contact />
      </motion.div>

    </div>
  );
};

export default Hero;