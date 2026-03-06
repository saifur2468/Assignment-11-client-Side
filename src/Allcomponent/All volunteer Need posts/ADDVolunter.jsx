import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthSection/AuthProvider";
import Swal from "sweetalert2";

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newPost = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value, 10),
      rating: parseFloat(form.rating.value) || 0,
      organizerName: form.organizerName.value,
      organizerEmail: user.email,
      deadline: new Date(form.deadline.value).toISOString(),
      thumbnail: form.thumbnail.value,
    };

    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await res.json();
      if (data.insertedId) {
        Swal.fire("Success!", "Post added successfully", "success");
        form.reset();
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 dark:bg-gray-900 shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
        Add New Volunteer Post
      </h2>

      <form onSubmit={handleAddPost} className="space-y-4">

        {/* Post Title */}
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Category */}
        <select
          name="category"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          defaultValue=""
        >
          <option value="" disabled>Select Category</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Social Service">Social Service</option>
          <option value="Animal Welfare">Animal Welfare</option>
          <option value="Blood Donation">Blood Donation</option>
          <option value="Traffic">Traffic</option>
        </select>

        {/* Location */}
        <select
          name="location"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          defaultValue=""
        >
          <option value="" disabled>Select Location</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattogram">Chattogram</option>
          <option value="Khulna">Khulna</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Barisal">Barisal</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Mymensingh">Mymensingh</option>
        </select>

        {/* Volunteers Needed */}
        <input
          type="number"
          name="volunteersNeeded"
          placeholder="Volunteers Needed"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Rating */}
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="rating"
          placeholder="Rating (0-10)"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Organizer Name */}
        <input
          type="text"
          name="organizerName"
          placeholder="Organizer Name"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Thumbnail URL */}
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Deadline */}
        <input
          type="date"
          name="deadline"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
        >
          {loading ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;