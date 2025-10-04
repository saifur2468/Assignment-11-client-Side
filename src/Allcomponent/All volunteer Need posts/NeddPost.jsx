import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NeddPost = () => {
  const [volunteerPosts, setVolunteerPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetch("http://localhost:5000/volunter")
      .then((res) => res.json())
      .then((data) => setVolunteerPosts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredPosts = volunteerPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        All Volunteer Need Posts
      </h2>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  mx-auto border border-gray-300 rounded-lg px-4 py-3 text-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length === 0 && (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No posts found!
          </p>
        )}

        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.description}</p>

              <div className="mt-auto flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Volunteers: {post.volunteersNeeded}
                </span>
               <Link to={`/PostDetalies/${post._id}`} >
                <button className="btn btn-sm btn-secondary text-white bg-indigo-500 hover:bg-indigo-600 border-0">
                  Post Details
                </button>
               </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeddPost;
