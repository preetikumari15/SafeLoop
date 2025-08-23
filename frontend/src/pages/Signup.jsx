import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    emergencyContact: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://safeloop-o0pc.onrender.com/api/signup", formData);
      if (res.data.success) {
        alert("Signup successful!");
        localStorage.setItem("token", res.data.token);
      localStorage.setItem("emergencyContact", res.data.user.emergencyContact);
      localStorage.setItem("name", res.data.user.name);
        navigate("/login");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="emergencyContact"
            placeholder="Emergency Contact Number"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-md text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-700 hover:underline text-md font-bold">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
