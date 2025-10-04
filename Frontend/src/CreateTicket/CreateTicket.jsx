import React, { useState, useEffect } from "react";
import API from "../api"; // axios instance
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  const token=localStorage.getItem("token")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Title and Description are required");
      return;
    }

    setLoading(true);
    try {
      await API.post(
        "/tickets",
        { title, description, priority },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.err || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
      <div className="max-w-2xl w-full bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          🎫 Create New Ticket
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
         
          <div>
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter ticket title"
              className="w-full px-4 py-2 rounded-lg bg-gray-700/80 text-white border border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

         
          <div>
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700/80 text-white border border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none h-32"
            />
          </div>

         
          <div>
            <label className="block text-gray-300 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700/80 text-white border border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

         
          <button
  type="submit"
  disabled={!token || loading}
  className={`w-full py-3 ${
    !token
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-indigo-600 hover:bg-indigo-500"
  } text-white text-lg font-semibold rounded-lg transition duration-300 ${
    loading ? "opacity-70 cursor-not-allowed" : ""
  }`}
>
  {!token
    ? "🔒 Please login to create ticket"
    : loading
    ? "⏳ Creating Ticket..."
    : "🚀 Create Ticket"}
</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
