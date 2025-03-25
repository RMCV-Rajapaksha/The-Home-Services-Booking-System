import axios from "axios";

const instance = axios.create({
  baseURL: "https://app.devdex.online",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      try {
        const { token } = JSON.parse(authData);
        if (token) {
          // Match the Bearer token format expected by the backend
          config.headers.Authorization = `${token}`;
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
        localStorage.removeItem("authData");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("authData");

      // Redirect to login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
