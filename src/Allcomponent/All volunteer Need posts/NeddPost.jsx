import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./../AuthSection/Spinner"; 

const NeddPost = () => {
  const [volunteerPosts, setVolunteerPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const postsPerPage = 6; 

  // Fetch data
  useEffect(() => {
    fetch("https://volunter-server-iota.vercel.app/volunter")
      .then((res) => res.json())
      .then((data) => {
        setVolunteerPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />; 

  
  const filteredPosts = volunteerPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

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
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }}
          className="w-full mx-auto border border-gray-300 rounded-lg px-4 py-3 text-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.length === 0 && (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No posts found!
          </p>
        )}

        {currentPosts.map((post) => (
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
                <Link to={`/PostDetalies/${post._id}`}>
                  <button className="btn btn-sm btn-secondary text-white bg-indigo-500 hover:bg-indigo-600 border-0">
                    Post Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-indigo-200"
              } transition-colors`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NeddPost;
