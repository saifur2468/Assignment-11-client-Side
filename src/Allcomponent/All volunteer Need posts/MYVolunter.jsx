import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthSection/AuthProvider";
import Swal from "sweetalert2";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const isAdmin = user?.email === "mdislamshakib218@gmail.com";

  // Fetch posts (admin: all posts, user: own posts)
  const fetchPosts = async () => {
    if (!user?.email) return;
    const url = isAdmin
      ? "http://localhost:5000/posts/all"
      : `http://localhost:5000/posts?email=${user.email}`;
    const res = await fetch(url);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  // Delete Post
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `http://localhost:5000/posts/${id}?email=${user.email}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      Swal.fire("Deleted!", "Post deleted successfully.", "success");
      setPosts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  // Update Post
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedPost = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value, 10),
      deadline: new Date(form.deadline.value).toISOString(),
      thumbnail: form.thumbnail.value,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/posts/${selectedPost._id}?email=${user.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPost),
        }
      );
      const data = await res.json();

      if (data.matchedCount) {
        Swal.fire("Updated!", "Post updated successfully.", "success");
        setPosts((prev) =>
          prev.map((p) =>
            p._id === selectedPost._id ? { ...p, ...updatedPost } : p
          )
        );
        setSelectedPost(null);
      } else {
        Swal.fire("Error!", "Update failed or unauthorized.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">My Posts</h2>

      {posts.length === 0 ? (
        <p className="text-center">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <h3 className="font-bold text-xl">{post.title}</h3>
              <p className="text-gray-600 mb-1">{post.description}</p>
              <p className="text-sm text-gray-500">Category: {post.category}</p>
              <p className="text-sm text-gray-500">Location: {post.location}</p>
              <p className="text-sm text-gray-500">
                Volunteers Needed: {post.volunteersNeeded}
              </p>
              <p className="text-sm text-gray-500">
                Deadline: {new Date(post.deadline).toLocaleDateString()}
              </p>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-lg w-full space-y-4 relative"
          >
            <h3 className="text-2xl font-bold">Update Post</h3>

            <input
              type="text"
              name="title"
              defaultValue={selectedPost.title}
              placeholder="Title"
              required
              className="w-full px-4 py-2 border rounded"
            />
            <textarea
              name="description"
              defaultValue={selectedPost.description}
              placeholder="Description"
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="category"
              defaultValue={selectedPost.category}
              placeholder="Category"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="location"
              defaultValue={selectedPost.location}
              placeholder="Location"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="number"
              name="volunteersNeeded"
              defaultValue={selectedPost.volunteersNeeded}
              placeholder="Volunteers Needed"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="date"
              name="deadline"
              defaultValue={new Date(selectedPost.deadline)
                .toISOString()
                .split("T")[0]}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="thumbnail"
              defaultValue={selectedPost.thumbnail}
              placeholder="Thumbnail URL"
              className="w-full px-4 py-2 border rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyPosts;