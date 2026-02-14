import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthSection/AuthProvider";
import Swal from "sweetalert2";
import Spinner from "./../AuthSection/Spinner";

const PostDetalies = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    fetch(`https://volunter-server-iota.vercel.app/volunter/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); 
      });
  }, [id]);

  if (loading) return <Spinner />; 
  if (!post) return <p className="text-center mt-10 text-gray-500">Post not found!</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const volunteerRequest = {
      thumbnail: post.thumbnail,
      postTitle: post.title,
      description: post.description,
      category: post.category,
      location: post.location,
      volunteersNeeded: post.volunteersNeeded,
      deadline: post.deadline,
      organizerName: post.organizerName,
      organizerEmail: post.organizerEmail,
      volunteerName: user?.displayName,
      volunteerEmail: user?.email,
      suggestion,
      status: "requested",
      postId: post._id,
    };

    try {
      const res = await fetch("https://volunter-server-iota.vercel.app/volunteerRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteerRequest),
      });

      const data = await res.json();
      if (data.insertedId) {
        Swal.fire("Success!", "Your request has been submitted!", "success");
        setIsModalOpen(false);
        setSuggestion("");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-md mt-10 bg-white dark:bg-gray-800 transition-colors duration-300">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{post.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{post.description}</p>
      <p className="dark:text-gray-300"><strong>Category:</strong> {post.category}</p>
      <p className="dark:text-gray-300"><strong>Location:</strong> {post.location}</p>
      <p className="dark:text-gray-300"><strong>Volunteers Needed:</strong> {post.volunteersNeeded}</p>
      <p className="dark:text-gray-300"><strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}</p>
      <p className="dark:text-gray-300"><strong>Organizer:</strong> {post.organizerName} ({post.organizerEmail})</p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-sm text-white m-auto bg-indigo-500 hover:bg-indigo-600 border-0 mt-4 transition-colors duration-300"
      >
        Be A Volunteer
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg relative p-6 overflow-y-auto max-h-[90vh] transition-colors duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition-colors duration-200"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Be a Volunteer</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Post Info */}
              <input type="text" value={post.title} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />
              <textarea value={post.description} readOnly className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />
              <input type="text" value={post.category} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />
              <input type="text" value={post.location} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />
              <input type="number" value={post.volunteersNeeded} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />
              <input type="text" value={new Date(post.deadline).toLocaleDateString()} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />
              <input type="text" value={post.organizerName} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />
              <input type="text" value={post.organizerEmail} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />

              {/* User info */}
              <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />
              <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-100" />

              {/* Suggestion */}
              <textarea
                placeholder="Write your suggestion..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="textarea textarea-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
              ></textarea>

              <button type="submit" className="btn btn-primary w-full mt-2 bg-indigo-500 hover:bg-indigo-600 border-0 text-white transition-colors duration-300">
                Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetalies;
