// // File: WhatMakesUsDifferent.jsx
// import React from "react";
// import { FaRegLightbulb, FaUsers, FaTasks, FaHeart } from "react-icons/fa";
// import { Typewriter } from "react-simple-typewriter";
// const features = [
//   {
//     icon: <FaRegLightbulb className="text-4xl text-blue-500 mb-3" />,
//     title: "Skill-Based Matching",
//     desc: "Find opportunities that match your skills and interests.",
//   },
//   {
//     icon: <FaHeart className="text-4xl text-red-500 mb-3" />,
//     title: "Real Impact Stories",
//     desc: "See real experiences from volunteers and the difference they make.",
//   },
//   {
//     icon: <FaTasks className="text-4xl text-green-500 mb-3" />,
//     title: "Easy Management",
//     desc: "Add, view, and manage your posts and requests effortlessly.",
//   },
//   {
//     icon: <FaUsers className="text-4xl text-yellow-500 mb-3" />,
//     title: "Community Focus",
//     desc: "Join a supportive and collaborative volunteer community.",
//   },
// ];

// const WhatMakesUsDifferent = () => {
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4 text-center">
//         {/* <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2> */}
        
//        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
//          <Typewriter
//             words={['What Makes Us Different']}
//             loop={false} 
//             cursor
//             cursorStyle="|"
//             typeSpeed={80}   
//             deleteSpeed={50} 
//             delaySpeed={1500} 
//           />
//        </h2>
        
//         <p className="text-gray-600 mb-12">
//           Discover why our platform stands out for volunteers and organizers.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="flex justify-center">{feature.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-500">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhatMakesUsDifferent;





import React from "react";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
const HoverDevCards = () => {
  return (
    <div className="p-4">
     <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
         <Typewriter
            words={['What Makes Us Different']}
            loop={false} 
            cursor
            cursorStyle="|"
            typeSpeed={80}   
            deleteSpeed={50} 
            delaySpeed={1500} 
          />
       </h2>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card
          title="Easy Management "
          subtitle="Add, view, and manage your posts and requests effortlessly."
          href="#"
          Icon={FiUser}
        />
        <Card title="Email" subtitle="Manage email" href="#" Icon={FiMail} />
        <Card title="Team" subtitle="Manage team" href="#" Icon={FiUsers} />
        <Card
          title="Billing"
          subtitle="Manage cards"
          href="#"
          Icon={FiCreditCard}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <a
      href={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </a>
  );
};

export default HoverDevCards;