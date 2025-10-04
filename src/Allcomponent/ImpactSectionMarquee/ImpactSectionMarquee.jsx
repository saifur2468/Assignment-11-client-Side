import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Typewriter } from "react-simple-typewriter";
const ImpactSectionMarquee = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/impactData.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className=" bg-gray-50 border-2 rounded-xl py-16 px-4 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
          <Typewriter
            words={['see the our project and volunteer Amount']}
            loop={false} 
            cursor
            cursorStyle="|"
            typeSpeed={80}   
            deleteSpeed={50} 
            delaySpeed={1500} 
          />
           
        </h2>
       
        <p className="text-gray-600">{data.subtitle}</p>
      </div>

      {/* React Fast Marquee */}
      <Marquee gradient={false} speed={150} pauseOnHover={true}>
        {data.stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-xl p-6 mx-6 min-w-[220px] text-center hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-4xl font-extrabold text-blue-600">
              {stat.value}
            </h3>
            <p className="text-gray-600 mt-2 text-lg">{stat.label}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ImpactSectionMarquee;
