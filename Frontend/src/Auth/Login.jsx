import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // ensure this is axios instance pointing to your backend

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await API.post("/auth/login", formData); // backend login route
      localStorage.setItem("token", res.data.token); // save JWT
      alert("Login successful!");
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.err || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">

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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up link */}
        <p className="mt-4 text-gray-400 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-400 cursor-pointer hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
