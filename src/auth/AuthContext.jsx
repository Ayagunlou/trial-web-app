import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const login = (newToken,username) => {
    localStorage.setItem("access_token", newToken);
    localStorage.setItem("username", username);
    setToken(newToken);
    setUsername(username);
    navigate("/home");
  };

  const logout = async () => {
    try {
      await axios.get("/auth/logout"); // 🔴 เรียก API logout ที่ backend
    } catch (err) {
      console.error("Logout failed (but proceeding):", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      setToken(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated ,username}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
