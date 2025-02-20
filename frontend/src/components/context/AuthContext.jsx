import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axiosInstance";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedAuth = window.localStorage.getItem("auth");

    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      setAuth(parsedAuth);
    } else {
      setAuth(null);
    }
  }, [navigate, location]);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/loginn", { username, password });
      const { token, user } = response.data;
      setAuth({ token, user });
      window.localStorage.setItem("auth", JSON.stringify({ token, user }));
      navigate("/dashboard"); // Redirect to a protected route after login
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setAuth(null);
    window.localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};