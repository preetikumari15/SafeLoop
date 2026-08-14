import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://safeloop-o0pc.onrender.com/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      alert(
        err.response?.data?.message ||
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-md text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-700 hover:underline text-md font-bold">Register</a>
        </p>
      </form>
      
    </div>
  );
};

export default Login;
