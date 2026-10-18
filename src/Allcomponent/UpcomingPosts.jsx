import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import Spinner from "./AuthSection/Spinner";

import { FaCalendarAlt, FaStar, FaMapMarkerAlt, FaTag, FaExternalLinkAlt } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

const UpcomingPosts = () => {
  const [upcomingPosts, setUpcomingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch("https://volunter-server-iota.vercel.app/posts/top-rated");
        if (!res.ok) throw new Error("Backend Theke Data Load hote parche na Try korote thako");
        const data = await res.json();
        setUpcomingPosts(data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  if (loading) return <Spinner />;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Header Section */}
      <div className="text-center space-y-3 mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          <Typewriter
            words={["Upcoming Volunteer Events"]}
            loop={false}
            cursor
            typeSpeed={80}
          />
        </h2>
        <div className="h-1.5 w-16 bg-emerald-500 mx-auto rounded-full"></div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto pt-2">
          Discover top-rated community initiatives and join hands to create a meaningful impact.
        </p>
      </div>

      {upcomingPosts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 text-lg italic mb-6">No upcoming volunteer posts found!</p>
          <Link to="/posts" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all">
            View All Posts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingPosts.map((post) => (
            <div
              key={post._id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer flex flex-col bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200/80 dark:border-gray-800 overflow-hidden transform hover:-translate-y-1"
            >
              {/* Thumbnail with Category Badge */}
              <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={post.thumbnail || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 shadow-sm border border-gray-200/50 dark:border-gray-800">
                  <FaTag className="text-[10px]" /> 
                  <span>{post.category}</span>
                </div>

                {/* Subtle Hover Action Indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md flex items-center justify-center text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {/* Info Details Footer */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100 dark:border-gray-800/80 text-xs text-gray-600 dark:text-gray-400 font-medium">
                  <div className="flex items-center gap-2.5">
                    <FaMapMarkerAlt className="text-rose-500 shrink-0 text-sm" />
                    <span className="truncate">{post.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FaCalendarAlt className="text-emerald-500 shrink-0 text-sm" />
                      <span>Deadline: {new Date(post.deadline).toLocaleDateString("en-GB")}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200/50 dark:border-amber-900/50">
                      <FaStar className="text-xs" />
                      <span>{post.rating || "0.0"}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

</section>
  );
};

export default UpcomingPosts;