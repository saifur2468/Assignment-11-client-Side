import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthSection/AuthProvider";
import Swal from "sweetalert2";

const BeVolunteerModal = ({ post, onClose }) => {
    const { user } = useContext(AuthContext);
    const [suggestion, setSuggestion] = useState("");

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
                onClose();
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Something went wrong!", "error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">Be a Volunteer</h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input type="text" value={post.title} readOnly className="input input-bordered w-full" />
                    <textarea value={post.description} readOnly className="textarea textarea-bordered w-full" />
                    <input type="text" value={post.category} readOnly className="input input-bordered w-full" />
                    <input type="text" value={post.location} readOnly className="input input-bordered w-full" />
                    <input type="number" value={post.volunteersNeeded} readOnly className="input input-bordered w-full" />
                    <input type="text" value={post.deadline} readOnly className="input input-bordered w-full" />
                    <input type="text" value={post.organizerName} readOnly className="input input-bordered w-full" />
                    <input type="text" value={post.organizerEmail} readOnly className="input input-bordered w-full" />

                    {/* User info */}
                    <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full" />
                    <input type="email" value={user?.email} readOnly className="input input-bordered w-full" />

                    {/* Editable input */}
                    <textarea
                        placeholder="Write your suggestion..."
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    ></textarea>

                    {/* Default status (hidden input) */}
                    <input type="hidden" value="requested" />

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-2"
                    >
                        Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BeVolunteerModal;
