
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
const UpcomingPosts = () => {
  const [upcomingPosts, setUpcomingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch("http://localhost:5000/upcomingPosts"); // server e endpoint
        const data = await res.json();
        setUpcomingPosts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (upcomingPosts.length === 0)
    return <p className="text-center mt-10 text-gray-500">No upcoming volunteer posts!</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
<h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
  <Typewriter
    words={['Upcoming Volunteer Opportunities']}
    loop={false} 
    cursor
    cursorStyle="|"
    typeSpeed={80}   
    deleteSpeed={50} 
    delaySpeed={1500} 
  />
</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingPosts.map((post) => (
          <div key={post._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{post.description.slice(0, 80)}...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                <strong>Category:</strong> {post.category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                <strong>Location:</strong> {post.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                <strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}
              </p>
              <a
                 to={`/NeddPost/${post._id}`}
                className="inline-block mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
              >
               All Post
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingPosts;
