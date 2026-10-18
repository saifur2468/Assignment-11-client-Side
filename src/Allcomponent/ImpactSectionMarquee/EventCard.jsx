// File: EventCard.jsx
import React from "react";
import { FaStar, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const events = [
  {
    title: "Tree Planting Campaign",
    location: "City Park",
    rating: 4.8,
    description: "Join us to plant 200 trees and build a cleaner, greener urban environment.",
    img: "https://i.postimg.cc/CxBdvqbN/images.jpg",
  },
  {
    title: "Food Drive Initiative",
    location: "Community Center",
    rating: 4.5,
    description: "Help distribute food packs and essential aid to underprivileged families.",
    img: "https://i.postimg.cc/pLhy0FK9/images-(1).jpg",
  },
  {
    title: "Blood Donation Camp",
    location: "Central Hospital",
    rating: 4.9,
    description: "Donate blood, save critical lives, and support our local healthcare drive.",
    img: "https://i.postimg.cc/W3v6tJ1b/blood.jpg",
  },
  {
    title: "Education For Children",
    location: "Central School & College",
    rating: 4.7,
    description: "Empower kids through interactive learning and educational material distribution.",
    img: "https://i.postimg.cc/bwDd6t1D/images-(2).jpg",
  },
  {
    title: "Free Medical Support Camp",
    location: "Gopalganj",
    rating: 4.6,
    description: "Providing free health checkups and essential medicine to rural communities.",
    img: "https://i.postimg.cc/13n4WqD3/images-(3).jpg",
  },
  {
    title: "Clean Water Project",
    location: "Dhaka",
    rating: 4.8,
    description: "Installing clean drinking water facilities for vulnerable local neighborhoods.",
    img: "https://i.postimg.cc/6p2THvCd/volunteers-clean-up-on-beach-group-of-people-with-plastic-bags-at-work-on-seashore-oceanic-natural-l.jpg",
  },
];

const EventCard = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight min-h-[48px]">
            <Typewriter
              words={['Check Our Complete Events', 'Join Hands for a Cause', 'Make a Real Difference']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-3">
            Explore all upcoming volunteer opportunities and get involved in the initiatives you care about.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-16 mySwiper"
        >
          {events.map((event, index) => (
            <SwiperSlide key={index} className="h-auto py-2">
              <div className="group bg-white dark:bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
                
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5 shadow-md">
                    <FaStar className="text-amber-400 text-sm" />
                    <span>{event.rating}</span>
                  </div>

                  {/* Location Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white/90 font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                    <FaMapMarkerAlt className="text-emerald-400" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2.5 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                 
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default EventCard;