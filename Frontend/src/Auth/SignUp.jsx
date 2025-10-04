import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // axios instance

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Email is not valid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      // Backend API call
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful! Redirecting to login...");
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.err || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
             
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
                errors.password ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition duration-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
