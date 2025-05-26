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

// Modified checkAuthStatus to be less aggressive
const checkAuthStatus = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      await api.get("/auth/verify");
    } catch (error) {
      // Only remove token if it's explicitly invalid
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
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

// Modified response interceptor to be less aggressive with redirects
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on explicit authentication failures
    if (
      error.response?.status === 401 &&
      error.response?.data?.msg === "Token is not valid"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
