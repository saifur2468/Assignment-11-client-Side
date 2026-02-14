import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthSection/AuthProvider";
import Swal from "sweetalert2";

const MYVolunter = () => {
  const { user } = useContext(AuthContext);
  const [volunteerPosts, setVolunteerPosts] = useState([]);
  const [isTableView, setIsTableView] = useState(false);
  const navigate = useNavigate();

  // Fetch My Posts
  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://volunter-server-iota.vercel.app/volunter?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setVolunteerPosts(data))
      .catch((err) => console.error(err));
  }, [user]);

  // DELETE
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `https://volunter-server-iota.vercel.app/volunter/${id}?email=${user.email}`,
            { method: "DELETE" }
          );
          const data = await res.json();
          if (res.ok) {
            setVolunteerPosts((prev) => prev.filter((post) => post._id !== id));
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          } else {
            Swal.fire("Unauthorized!", data.message, "error");
          }
        } catch (err) {
          Swal.fire("Error!", "Failed to delete post.", "error");
        }
      }
    });
  };

  // UPDATE
  const handleUpdate = (id) => {
    navigate(`/PostUpdated/${id}?email=${user.email}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        My Volunteer Posts
      </h2>

      {/* Toggle Layout Button */}
      <div className="text-center mb-6 flex justify-center">
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          {isTableView ? "Show Card Layout" : "Change Layout"}
        </button>
      </div>

      {volunteerPosts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg sm:text-xl mt-10">
          You haven’t added any volunteer posts yet!
        </p>
      ) : isTableView ? (
        // ================= Table View =================
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr className="bg-indigo-500 text-white text-sm sm:text-base">
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Thumbnail</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Title</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Description</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Category</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Location</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteerPosts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b hover:bg-gray-50 text-sm sm:text-base transition duration-150"
                >
                  <td className="py-2 px-2 sm:py-2 sm:px-4">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-20 sm:w-24 h-12 sm:h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4 font-semibold">{post.title}</td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4 line-clamp-2">{post.description}</td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4">{post.category}</td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4">{post.location}</td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4 text-center flex flex-col sm:flex-row justify-center items-center sm:space-x-2 space-y-1 sm:space-y-0">
                    <button
                      onClick={() => handleUpdate(post._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // ================= Card (Grid) View =================
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteerPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition duration-300"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-700 line-clamp-3 mb-3">{post.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Category: <span className="font-medium">{post.category}</span>
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Location: <span className="font-medium">{post.location}</span>
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleUpdate(post._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm transition duration-200"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MYVolunter;
