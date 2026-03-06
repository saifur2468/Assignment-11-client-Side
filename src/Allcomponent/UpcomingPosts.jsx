import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import Spinner from "./AuthSection/Spinner";
import { FaCalendar, FaStar } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

const UpcomingPosts = () => {
  const [upcomingPosts, setUpcomingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null); 

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch("http://localhost:5000/posts/top-rated");
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        <Typewriter
          words={["Upcoming Volunteer Events"]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={80}
        />
      </h2>

      {upcomingPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl italic">
            No upcoming volunteer posts found!
          </p>
          <Link
            to="/posts"
            className="text-indigo-500 underline mt-4 inline-block"
          >
            View all posts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingPosts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-indigo-200"
            >
              
              <div className="relative">
                <img
                  src={
                    post.thumbnail ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                  {post.category}
                </div>
              </div>

             
              <div className="p-5 flex-grow">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>

                <div className="space-y-2 border-t pt-3 border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      <FaLocationPin /> Location:
                    </span>{" "}
                    {post.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      <FaCalendar /> Deadline:
                    </span>{" "}
                    {new Date(post.deadline).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-sm text-yellow-600 font-semibold">
                    <FaStar /> Rating: {post.rating || 0}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-lg w-full relative">
            <h3 className="text-2xl font-bold mb-2">{selectedPost.title}</h3>
            <p className="mb-1">
              Category: {selectedPost.category}
            </p>
            <p className="mb-1">Location: {selectedPost.location}</p>
            <p className="mb-1">Deadline: {new Date(selectedPost.deadline).toLocaleDateString()}</p>
            <p className="mb-1">Rating: {selectedPost.rating || 0}</p>
            <p className="mb-4">{selectedPost.description}</p>
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingPosts;