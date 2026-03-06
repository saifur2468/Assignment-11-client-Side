import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthSection/AuthProvider";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
const AllPosts = ({ onRequestClick }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("card"); 
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/posts/all");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch posts", "error");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRequest = async (postId) => {
    if (!user?.email)
      return Swal.fire("Login Required", "Please login first", "warning");

    try {
      const res = await fetch("http://localhost:5000/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, volunteerEmail: user.email }),
      });
      const data = await res.json();
      if (data.insertedId) Swal.fire("Success", "Request sent!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10">
      {/* Search & View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text "
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-1/2 text-center"
        />
        <button
          onClick={() => setView(view === "card" ? "table" : "card")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {view === "card" ? "Table View" : "Card View"}
        </button>
      </div>

      {/* Card View */}
      {view === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col"
            >
              {/* Thumbnail */}
              <img
                src={
                  post.thumbnail ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={post.title}
                className="w-full h-48 object-cover rounded mb-2"
              />

              {/* Post Info */}
              <h3 className="font-bold text-xl">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.category}</p>
              <p className="text-sm text-gray-500">{post.location}</p>
              <p className="text-sm text-yellow-600 font-semibold">
                <FaStar></FaStar> Rating: {post.rating || 0}
              </p>

              {/* Details Button */}
              <button
                onClick={() => setSelectedPost(post)}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                  Thumbnail
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPosts.map((post) => (
                <tr key={post._id}>
                  <td className="px-6 py-2">
                    <img
                      src={
                        post.thumbnail ||
                        "https://via.placeholder.com/100x60?text=No+Image"
                      }
                      alt={post.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-2">{post.title}</td>
                  <td className="px-6 py-2">{post.category}</td>
                  <td className="px-6 py-2">{post.location}</td>
                  <td className="px-6 py-2 text-yellow-600 font-semibold">
                    <FaStar></FaStar> {post.rating || 0}
                  </td>
                  <td className="px-6 py-2">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal / Details */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-lg w-full relative">
            <img
              src={
                selectedPost.thumbnail ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={selectedPost.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedPost.title}</h3>
            <p className="mb-1">Category: {selectedPost.category}</p>
            <p className="mb-1">Location: {selectedPost.location}</p>
            <p className="mb-1">
              Volunteers Needed: {selectedPost.volunteersNeeded}
            </p>
            <p className="mb-1">
              Deadline: {new Date(selectedPost.deadline).toLocaleDateString()}
            </p>
            <p className="mb-1"><FaStar></FaStar> Rating: {selectedPost.rating || 0}</p>
            <p className="mb-4">{selectedPost.description}</p>

            <button
              onClick={() => handleRequest(selectedPost._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Request to Volunteer
            </button>
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;