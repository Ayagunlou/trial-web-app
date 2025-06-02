import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.post("/test/hello", {}, { timeout: 1000 });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (newToken, username) => {
    localStorage.setItem("access_token", newToken);
    localStorage.setItem("username", username);
    setToken(newToken);
    setUsername(username);
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
    } catch (err) {
      console.error("Logout failed (but proceeding):", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      setToken(null);
      setUsername(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated, isLoading, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
