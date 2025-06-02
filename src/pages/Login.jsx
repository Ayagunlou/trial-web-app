import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../api/axios";
import Spinner from "../components/Spinner.jsx";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../components/AlertMessage.jsx";
import { TypeAlert } from "../constants/constants";

// สร้าง validation schema
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { login, isAuthenticated } = useAuth(); // 💡 Get isAuthenticated
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // 🚀 Redirect to home if already logged in
    }
  }, [isAuthenticated, navigate]);
  const onSubmit = async (data) => {
    clearErrors("apiError"); // เคลียร์ error ก่อนส่งใหม่
    try {
      const res = await axios.post("/auth/login", data);
      login(res.data.accessToken, data.username);
    } catch (error) {
      setError("apiError", {
        type: "manual",
        message: error.response?.data || "Login failed",
      });
    }
  };

  // If already authenticated and redirecting, show spinner
  if (isAuthenticated) {
    return <></>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* 🔹 Alert Message Container - Placed within the centering div */}
      <div className="absolute top-10 w-full max-w-sm px-4">
        {errors.apiError && (
          <AlertMessage type={TypeAlert.ERROR} msg={errors.apiError.message} />
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>
        <div className="mb-4">
          <input
            {...register("username")}
            className={`w-full px-3 py-2 bg-white text-gray-900 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Username"
            disabled={isSubmitting}
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            {...register("password")}
            type="password"
            className={`w-full px-3 py-2 bg-white text-gray-900 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Password"
            disabled={isSubmitting}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner
              size="sm"
              color="white"
              classSpinner="flex justify-center items-center"
            />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
