import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import Spinner from "./AuthSection/Spinner";

import { FaCalendarAlt, FaStar, FaMapMarkerAlt, FaTag, FaArrowRight } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

const UpcomingPosts = () => {
  const [upcomingPosts, setUpcomingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch("https://volunter-server-iota.vercel.app/posts/top-rated");
        if (!res.ok) throw new Error("Failed to fetch data");
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
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Title with Typewriter */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-3">
          <Typewriter
            words={["Upcoming Volunteer Events"]}
            loop={false}
            cursor
            typeSpeed={80}
          />
        </h2>
        <div className="h-1.5 w-20 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      {upcomingPosts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-3xl border-2 border-dashed">
          <p className="text-gray-500 text-xl italic mb-6">No upcoming volunteer posts found!</p>
          <Link to="/posts" className="btn btn-primary rounded-full px-8">View All</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingPosts.map((post) => (
            <div
              key={post._id}
              className="group flex flex-col bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              {/* Thumbnail with Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.thumbnail || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <FaTag /> {post.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-1">
                  {post.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2">
                    <FaMapMarkerAlt className="text-red-500 shrink-0" />
                    <span>{post.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2">
                    <FaCalendarAlt className="text-indigo-500 shrink-0" />
                    <span>Deadline: {new Date(post.deadline).toLocaleDateString("en-GB")}</span>
                  </div>
                  <div className="flex items-center text-sm font-bold text-yellow-600 gap-2">
                    <FaStar className="shrink-0" />
                    <span>Rating: {post.rating || "0.0"}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all duration-300 group/btn"
                >
                  View Details <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}


      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all duration-300">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2.5rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in zoom-in-95 fade-in duration-300 border border-white/20">

            {/* Close Button - More Visible */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 z-20 text-white bg-black/40 hover:bg-red-500 backdrop-blur-md p-2 rounded-full transition-all duration-300 group"
            >
              <IoCloseCircleOutline size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Hero Image Section */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={selectedPost.thumbnail}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                alt="Thumbnail"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <span className="bg-indigo-600 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest shadow-lg">
                  {selectedPost.category}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-gray-800 dark:text-white leading-tight">
                {selectedPost.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                {selectedPost.description}
              </p>

              {/* Info Grid - Styled with icons */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-500">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Location</p>
                    <p className="text-xs font-bold dark:text-gray-200">{selectedPost.location}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-500">
                    <FaCalendarAlt size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Deadline</p>
                    <p className="text-xs font-bold dark:text-gray-200">
                      {new Date(selectedPost.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button - Animated */}
              {/* <Link
          to={`/post-details/${selectedPost._id}`}
          className="group relative flex items-center justify-center gap-3 w-full bg-indigo-600 py-4 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-[0_10px_20px_rgba(79,70,229,0.3)] active:scale-[0.98]"
        >
          <span>Get Started Now</span>
          <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingPosts;