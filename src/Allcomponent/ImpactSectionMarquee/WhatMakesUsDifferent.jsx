import React from "react";
import { motion } from "framer-motion";

const VolunteerMarqueeSection = () => {
  // Volunteer Campaigns, Services & Opportunities Data
  const items = [
    {
      title: "Blood Donation Drive",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Food & Meal Distribution",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Disaster & Emergency Relief",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Youth Mentorship",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Community Clean-Up",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Free Medical Camp",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Education For All",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&auto=format&fit=crop&q=80",
    },
    {
      title: "Environmental Protection",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-950 py-6 border-y border-gray-200 dark:border-gray-800/80 overflow-hidden select-none transition-colors duration-300">
      <div className="flex w-full">
        <motion.div
          className="flex gap-8 items-center flex-shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
        >
          {/* Loop twice for continuous smooth infinite marquee */}
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 flex-shrink-0 bg-gray-50/80 dark:bg-gray-900/80 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-800 transition-all duration-300 shadow-sm"
            >
              {/* Campaign / Service Thumbnail */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-emerald-500/30">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Campaign Title */}
              <h2 className="text-base md:text-lg font-bold uppercase tracking-wider text-gray-800 dark:text-gray-100 whitespace-nowrap">
                {item.title}
              </h2>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VolunteerMarqueeSection;