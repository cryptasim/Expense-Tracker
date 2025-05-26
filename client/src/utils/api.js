import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://expense-tracker-server-l0az.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for sending cookies
});

// Response interceptor: redirect to login if 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
