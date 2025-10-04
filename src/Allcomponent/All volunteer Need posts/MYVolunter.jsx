import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MYVolunter = () => {
  const [volunteerPosts, setVolunteerPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/volunter")
      .then((res) => res.json())
      .then((data) => setVolunteerPosts(data))
      .catch((err) => console.error(err));
  }, []);

  // Delete Function
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
          const response = await fetch(`http://localhost:5000/volunter/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            setVolunteerPosts((prev) => prev.filter((post) => post._id !== id));
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          }
        } catch (err) {
          Swal.fire("Error!", "Failed to delete post.", "error");
        }
      }
    });
  };

  // Update Function
  const handleUpdate = (id) => {
    Swal.fire({
      title: "Update Post",
      text: "You are being redirected to the update page.",
      icon: "info",
      confirmButtonText: "OK",
    }).then(() => {
      navigate(`/PostUpdated/${id}`);
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-600">
        My Volunteer Posts
      </h2>

      {volunteerPosts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg sm:text-xl mt-10">
          You haven’t added any volunteer posts yet!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr className="bg-indigo-500 text-white text-sm sm:text-base">
                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left">Thumbnail</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left">Title</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left">Description</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteerPosts.map((post) => (
                <tr key={post._id} className="border-b hover:bg-gray-50 text-sm sm:text-base">
                  <td className="py-2 px-3 sm:py-2 sm:px-4">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-20 h-12 sm:w-24 sm:h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-3 sm:py-2 sm:px-4">{post.title}</td>
                  <td className="py-2 px-3 sm:py-2 sm:px-4 line-clamp-2">{post.description}</td>
                  <td className="py-2 px-3 sm:py-2 sm:px-4 text-center space-x-1 sm:space-x-2 flex justify-center">
                    <button
                      onClick={() => handleUpdate(post._id)}
                      className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-yellow-600 text-xs sm:text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MYVolunter;
