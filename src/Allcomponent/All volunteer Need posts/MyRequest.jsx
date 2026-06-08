import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthSection/AuthProvider";
import Swal from "sweetalert2";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const res = await fetch(`https://vloener-ser.vercel.app/my-requests?volunteerEmail=${user.email}`)

    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    if (user?.email) {
      loadRequests();
    }
  }, [user]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(
      `https://vloener-ser.vercel.app/cancel-request/${id}?email=${user.email}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.message) {
      Swal.fire("Cancelled", "Request cancelled successfully", "success");

      setRequests(requests.filter((item) => item._id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-5">My Volunteer Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>
                  <img
                    src={request.thumbnail}
                    alt=""
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>

                <td>{request.postTitle}</td>

                <td>{request.category}</td>

                <td>
                  <span className="badge badge-warning">
                    {request.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleCancel(request._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <p className="text-center py-5">
            No volunteer requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyRequests;