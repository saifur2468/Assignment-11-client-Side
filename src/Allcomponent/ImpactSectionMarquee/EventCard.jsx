// File: EventCard.jsx
import React from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
const events = [
  {
    title: "Tree Planting Campaign",
    location: "City Park",
    rating: 4.8,
    description: "Join us to plant 200 trees and make our city greener.",
    img: "https://i.postimg.cc/63XLTGpC/tree.jpg",
  },
  {
    title: "Food Drive",
    location: "Community Center",
    rating: 4.5, 
    description: "Help distribute food to underprivileged families.",
    img: "https://i.postimg.cc/HW34snGK/food-bank.png",
  },
  {
    title: "Blood Donation",
    location: "Central Hospital",
    rating: 4.2,
    description: "Donate blood and save lives.",
    img: "https://i.postimg.cc/W3v6tJ1b/blood.jpg",
  },
  {
    title: "Education",
    location: "Central School & College",
    rating: 4.2,
    description: "Donate blood and save lives.",
    img: "https://i.postimg.cc/mkh0pqfm/volunteering-in-school.jpg",
  },
  {
    title: "Free Medical Camp",
    location: "GopalGonj",
    rating: 4.2,
    description: "Donate blood and save lives.",
    img: "https://i.postimg.cc/1X4L7ThY/product-5c657368e6500-1600.jpg",
  },
  {
    title: "Clean Water",
    location: "Dhaka",
    rating: 4.2,
    description: "Donate blood and save lives.",
    img: "https://i.postimg.cc/Jn7wZ0Th/343849-ha-noi-xanh.jpg",
  },
];

const EventCard = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center mb-8">
        {/* <h1 className="text-3xl font-bold">Check Our Complete Events</h1> */}
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
                 <Typewriter
                    words={['Check Our Complete Events']}
                    loop={false} 
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}   
                    deleteSpeed={50} 
                    delaySpeed={1500} 
                  />
               </h2>
        <p className="text-gray-600 mt-2">
          Explore all upcoming volunteer events and join the ones you love.
        </p>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* Event Image */}
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-start p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-red-400" /> {event.location}
              </div>
              <div className="flex items-center mb-2">
                <FaStar className="mr-2 text-yellow-400" /> {event.rating} / 5
              </div>
              <p className="text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventCard;
