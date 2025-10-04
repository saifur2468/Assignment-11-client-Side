import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const ADDVolunter = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handlevolunter = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newvolunter = {
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

    console.log("Sending to server:", newvolunter);

    try {
      const res = await fetch("http://localhost:5000/volunter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newvolunter),
      });
      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Volunteer Added Successfully",
          icon: "success",
          confirmButtonText: "Volunte Add",
        });
        form.reset();
        setStartDate(new Date());
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "success",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-200 dark:bg-gray-900 shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
        Add Volunteer Need Post
      </h2>

      <form onSubmit={handlevolunter} className="space-y-4">
        {/* Thumbnail */}
        <div>
          <label className="block font-medium mb-1">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
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
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social-service">Social Service</option>
            <option value="animal-welfare">Animal Welfare</option>
             <option value="Blood Donation">Blood Donation</option>
             <option value="Traffic">Traffic</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          {/* <input
            type="text"
            name="location"
            className="w-full border rounded-lg px-4 py-2"
            required
          /> */}




          <select
            name="location"
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Bagerhat">Bagerhat</option>
            <option value="Bandarban">Bandarban</option>
            <option value="Barguna">Barguna</option>
            <option value="Barisal">Barisal</option>
            <option value="Bhola">Bhola</option>
            <option value="Bogra">Bogra</option>
            <option value="Brahmanbaria">Brahmanbaria</option>
            <option value="Chandpur">Chandpur</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Chuadanga">Chuadanga</option>
            <option value="Comilla">Comilla</option>
            <option value="Cox's Bazar">Cox's Bazar</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Dinajpur">Dinajpur</option>
            <option value="Faridpur">Faridpur</option>
            <option value="Feni">Feni</option>
            <option value="Gaibandha">Gaibandha</option>
            <option value="Gazipur">Gazipur</option>
            <option value="Gopalganj">Gopalganj</option>
            <option value="Habiganj">Habiganj</option>
            <option value="Jaipurhat">Jaipurhat</option>
            <option value="Jamalpur">Jamalpur</option>
            <option value="Jashore">Jashore</option>
            <option value="Jhalokati">Jhalokati</option>
            <option value="Jhenaidah">Jhenaidah</option>
            <option value="Joypurhat">Joypurhat</option>
            <option value="Khagrachhari">Khagrachhari</option>
            <option value="Khulna">Khulna</option>
            <option value="Kishoreganj">Kishoreganj</option>
            <option value="Kurigram">Kurigram</option>
            <option value="Kushtia">Kushtia</option>
            <option value="Lakshmipur">Lakshmipur</option>
            <option value="Lalmonirhat">Lalmonirhat</option>
            <option value="Madaripur">Madaripur</option>
            <option value="Magura">Magura</option>
            <option value="Manikganj">Manikganj</option>
            <option value="Meherpur">Meherpur</option>
            <option value="Moulvibazar">Moulvibazar</option>
            <option value="Munshiganj">Munshiganj</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Naogaon">Naogaon</option>
            <option value="Narail">Narail</option>
            <option value="Narsingdi">Narsingdi</option>
            <option value="Natore">Natore</option>
            <option value="Netrokona">Netrokona</option>
            <option value="Nilphamari">Nilphamari</option>
            <option value="Noakhali">Noakhali</option>
            <option value="Pabna">Pabna</option>
            <option value="Panchagarh">Panchagarh</option>
            <option value="Patuakhali">Patuakhali</option>
            <option value="Pirojpur">Pirojpur</option>
            <option value="Rajbari">Rajbari</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Rangamati">Rangamati</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Satkhira">Satkhira</option>
            <option value="Shariatpur">Shariatpur</option>
            <option value="Sherpur">Sherpur</option>
            <option value="Sirajganj">Sirajganj</option>
            <option value="Sunamganj">Sunamganj</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Tangail">Tangail</option>
            <option value="Thakurgaon">Thakurgaon</option>
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
            placeholder="Enter your name"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Organizer Email</label>
          <input
            type="email"
            name="organizerEmail"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default ADDVolunter;
