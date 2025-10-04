// Profile.jsx
import React, { useState, useEffect } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await API.get("/users/me", { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data);
        setFormData({ name: res.data.name, email: res.data.email, password: "" });
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = { name: formData.name, email: formData.email };
      if (formData.password) updateData.password = formData.password;

      const res = await API.put("/users/me", updateData, { headers: { Authorization: `Bearer ${token}` } });
      setUser(res.data);
      setEditing(false);
      setFormData({ ...formData, password: "" });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating profile.");
    }
  };

  // 🟢 Dark UI if no user logged in
  if (!token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black relative overflow-hidden">
        {/* Decorative blurred circles */}
        <div className="absolute w-72 h-72 bg-indigo-700/20 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-700/20 rounded-full blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 bg-gray-800/70 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-10 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-white mb-3">No User Logged In</h1>
          <p className="text-gray-400 mb-8">Please log in to access your profile.</p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // 🟢 Normal profile UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full p-10 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>

        {/* Header */}
        <div className="flex items-center mb-8 relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-4xl text-white font-bold mr-5 shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-gray-400 text-sm mt-1">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-5 py-2 rounded-xl shadow-lg transition-all duration-300"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Form / Info */}
        <div className="relative z-10">
          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-5">
              {["name", "email", "password"].map((field) => (
                <div key={field}>
                  <label className="text-gray-300 mb-1 block capitalize">{field}</label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field === "password" ? "Enter new password" : ""}
                    className="w-full px-5 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition"
                    required={field !== "password"}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold shadow-lg transition-all duration-300"
              >
                Update Profile
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 relative z-10">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Role:</span> {user.role || "User"}</p>
              <p><span className="font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
