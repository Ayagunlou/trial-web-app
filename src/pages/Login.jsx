import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx"; // ✨ Import Spinner

const Login = () => {
  const { login, isAuthenticated } = useAuth(); // 💡 Get isAuthenticated
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // ✨ Add loading state

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // 🚀 Redirect to home if already logged in
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✨ Set loading true
    try {
      const res = await axios.post("/auth/login", form);
      login(res.data.accessToken, form.username);
      // navigate('/'); // Navigation is handled by AuthContext or useEffect after isAuthenticated changes
    } catch (error) {
      console.error("Login failed:", error);
      // TODO: Show an error message to the user
    } finally {
      setIsLoading(false); // ✨ Set loading false
    }
  };

  // If already authenticated and redirecting, show spinner
  if (isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <input
            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" color="white" /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
