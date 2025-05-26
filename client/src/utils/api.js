import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://expense-tracker-server-l0az.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
// Add withCredentials for cookie handling
api.defaults.withCredentials = true;

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
