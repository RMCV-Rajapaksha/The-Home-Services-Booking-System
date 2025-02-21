import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axiosInstance";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = () => {
      const authData = window.localStorage.getItem("authData");

      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          if (parsed.token && parsed.user) {
            setAuth(parsed.user);
            setToken(parsed.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
          }
        } catch (error) {
          console.error("Error parsing auth data:", error);
          localStorage.removeItem("authData");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/login", credentials);
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      const authData = { token, user };
      localStorage.setItem("authData", JSON.stringify(authData));
      
      setAuth(user);
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("Invalid username or password");
      }
      throw error.response?.data?.message || "Login failed. Please try again.";
    }
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setAuth(null);
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate("/login");
  };

  const value = {
    auth,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};