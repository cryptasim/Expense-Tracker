import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://expense-tracker-server-l0az.onrender.com/api"
      : "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Check token on initial load
const checkAuthStatus = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      await api.get("/auth/verify"); // Add this endpoint in your backend
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }
};

// Call this when your app initializes
checkAuthStatus();

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
