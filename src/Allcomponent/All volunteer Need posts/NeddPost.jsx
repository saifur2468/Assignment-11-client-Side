import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthSection/AuthProvider";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa6";
import { 
  Search, 
  LayoutGrid, 
  List, 
  MapPin, 
  Calendar, 
  Users, 
  X, 
  Send, 
  Loader2,
  Tag 
} from "lucide-react";

const AllPosts = ({ onRequestClick }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("card");
  const [selectedPost, setSelectedPost] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://volunter-server-iota.vercel.app/posts/all");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch posts",
        confirmButtonColor: "#EF4444"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRequest = async (post) => {
    if (!user?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to submit a volunteer request",
        confirmButtonColor: "#10B981"
      });
    }

    try {
      setSubmitting(true);
      const res = await fetch("https://volunter-server-iota.vercel.app/volunteerRequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId: post._id,
          postTitle: post.title,
          postThumbnail: post.thumbnail,
          postCategory: post.category,
          volunteerEmail: user.email,
          volunteerName: user.displayName || "Anonymous",
          volunteerImage: user.photoURL || ""
        }),
      });

      const data = await res.json();
      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Sent!",
          text: "Your volunteer request has been successfully submitted.",
          confirmButtonColor: "#10B981"
        });
        setSelectedPost(null);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#EF4444"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              All Volunteer Opportunities
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Find and join upcoming volunteer programs across various categories.
            </p>
          </div>
        </div>

        {/* Search Bar & View Toggle Control */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, category, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
            />
          </div>

          {/* Toggle View Buttons */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl self-end sm:self-auto">
            <button
              onClick={() => setView("card")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                view === "card"
                  ? "bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setView("table")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                view === "table"
                  ? "bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
            <p className="text-sm">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800 my-8">
            <p className="text-gray-500 dark:text-gray-400 text-base font-medium">No volunteer posts found.</p>
          </div>
        ) : view === "card" ? (
          
          /* Card View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={
                      post.thumbnail ||
                      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=600"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-400/30">
                    {post.category || "General"}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1 shadow-sm">
                    <FaStar className="text-amber-400 text-xs" />
                    <span>{post.rating || 0}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    
                    <div className="mt-3 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{post.location || "N/A"}</span>
                      </div>
                      {post.volunteersNeeded && (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-500" />
                          <span>{post.volunteersNeeded} volunteers needed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="mt-5 w-full py-2.5 bg-gray-50 hover:bg-emerald-600 dark:bg-gray-800/80 dark:hover:bg-emerald-600 text-gray-800 dark:text-gray-200 hover:text-white font-semibold rounded-xl text-xs transition-all duration-200 border border-gray-200/80 dark:border-gray-700 hover:border-transparent active:scale-[0.98] cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          
          /* Table View */
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-50 dark:bg-gray-800/60 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Thumbnail</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-3">
                        <img
                          src={
                            post.thumbnail ||
                            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=100"
                          }
                          alt={post.title}
                          className="w-16 h-10 object-cover rounded-lg border border-gray-100 dark:border-gray-800"
                        />
                      </td>
                      <td className="px-6 py-3 font-semibold text-gray-900 dark:text-white">
                        {post.title}
                      </td>
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                          {post.category || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-xs">{post.location || "N/A"}</td>
                      <td className="px-6 py-3 text-xs font-semibold text-amber-500">
                        <span className="inline-flex items-center gap-1">
                          <FaStar className="text-amber-400 text-xs" /> {post.rating || 0}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modern Modal / Details */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl max-w-lg w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image */}
              <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-800">
                <img
                  src={
                    selectedPost.thumbnail ||
                    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=600"
                  }
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-md">
                    <Tag className="w-3 h-3" />
                    {selectedPost.category || "General"}
                  </span>
                  
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1 shadow-md">
                    <FaStar className="text-amber-400 text-xs" />
                    <span>{selectedPost.rating || 0}</span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                  {selectedPost.title}
                </h3>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span><strong>Location:</strong> {selectedPost.location || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span><strong>Needed:</strong> {selectedPost.volunteersNeeded || "N/A"}</span>
                  </div>
                  {selectedPost.deadline && (
                    <div className="flex items-center gap-2 col-span-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span>
                        <strong>Deadline:</strong>{" "}
                        {new Date(selectedPost.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-h-32 overflow-y-auto pr-1">
                  {selectedPost.description}
                </p>

                {/* Modal Footer / Action Button */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    disabled={submitting}
                    onClick={() => handleRequest(selectedPost)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Request to Volunteer</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllPosts;