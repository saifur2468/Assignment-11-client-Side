import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthSection/AuthProvider";
import Swal from "sweetalert2";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's requests
  const fetchRequests = async () => {
    try {
      const res = await fetch(`http://localhost:5000/volunteerRequests?volunteerEmail=${user?.email}`);
      const data = await res.json();
      setRequests(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchRequests();
  }, [user]);

  // Delete request
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/volunteerRequests/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your request has been deleted.", "success");
          setRequests(requests.filter((req) => req._id !== id));
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (requests.length === 0)
    return <p className="text-center mt-10 text-gray-500">You haven’t made any volunteer requests yet!</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">My Volunteer Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Suggestion</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="py-2 px-4 border-b">{req.postTitle}</td>
                <td className="py-2 px-4 border-b">{req.category}</td>
                <td className="py-2 px-4 border-b">{req.location}</td>
                <td className="py-2 px-4 border-b capitalize">{req.status}</td>
                <td className="py-2 px-4 border-b">{req.suggestion || "-"}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequests;
