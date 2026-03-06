import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthSection/AuthProvider";
import Swal from "sweetalert2";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    if (!user?.email) return;
    const res = await fetch(`http://localhost:5000/my-requests?volunteerEmail=${user.email}`);
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:5000/cancel-request/${id}?email=${user.email}`, { method: "DELETE" });
      if (res.ok) {
        Swal.fire("Cancelled", "Your request has been cancelled", "success");
        setRequests(prev => prev.filter(r => r._id !== id));
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">My Volunteer Requests</h2>
      {requests.length === 0 ? <p className="text-center">No requests yet.</p> : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Post ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {requests.map((r) => (
                <tr key={r._id}>
                  <td className="px-6 py-4">{r.postId}</td>
                  <td className="px-6 py-4">{r.status}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleCancel(r._id)} className="bg-red-500 text-white px-3 py-1 rounded">Cancel</button>
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

export default MyRequests;