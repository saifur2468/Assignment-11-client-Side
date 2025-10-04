import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const PostUpdated = () => {
  const { id } = useParams(); // URL থেকে id নিচ্ছে
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [post, setPost] = useState({});

  // পুরোনো ডাটা লোড করা
  useEffect(() => {
    fetch(`http://localhost:5000/volunter/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        if (data.deadline) setStartDate(new Date(data.deadline));
      });
  }, [id]);

  // Update function
  const handlevolunter = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedPost = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: form.volunteersNeeded.value,
      organizerName: form.organizerName.value,
      organizerEmail: form.organizerEmail.value,
      deadline: startDate,
    };

    try {
      const res = await fetch(`http://localhost:5000/volunter/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      const data = await res.json();

      if (data.modifiedCount > 0) {
        Swal.fire("Updated!", "Post updated successfully", "success");
        navigate("/My-Volunter");
      } else {
        Swal.fire("No changes", "Nothing was updated", "info");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-200 dark:bg-gray-900 shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
        Update Your Need Post
      </h2>

      <form onSubmit={handlevolunter} className="space-y-4">
        {/* Thumbnail */}
        <div>
          <label className="block font-medium mb-1">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            defaultValue={post.thumbnail}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="block font-medium mb-1">Post Title</label>
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            defaultValue={post.description}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            defaultValue={post.category}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social-service">Social Service</option>
            <option value="animal-welfare">Animal Welfare</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <select
            name="location"
            defaultValue={post.location}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Khulna">Khulna</option>
            <option value="Barisal">Barisal</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Mymensingh">Mymensingh</option>
          </select>
        </div>

        {/* Volunteers Needed */}
        <div>
          <label className="block font-medium mb-1">
            No. of Volunteers Needed
          </label>
          <input
            type="number"
            name="volunteersNeeded"
            defaultValue={post.volunteersNeeded}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-medium mb-1">Deadline</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Organizer Info */}
        <div>
          <label className="block font-medium mb-1">Organizer Name</label>
          <input
            type="text"
            name="organizerName"
            defaultValue={post.organizerName}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Organizer Email</label>
          <input
            type="email"
            name="organizerEmail"
            defaultValue={post.organizerEmail}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default PostUpdated;
