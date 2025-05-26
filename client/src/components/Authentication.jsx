import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Authentication = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { email, password, name } = formData;
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ name, email, password });
      }
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="auth-form"
      className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full animate-fade-in"
    >
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-block p-3 rounded-full bg-emerald-100 mb-3">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {isLogin ? "Sign in to your account" : "Create your free account"}
        </h2>
        <p className="text-sm text-gray-600">
          {isLogin
            ? "Welcome back! Please enter your details."
            : "Join thousands managing their finances smarter."}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-base"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-base"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-base"
            required
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          className="w-full py-2 sm:py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition text-base"
          disabled={loading}
        >
          {loading
            ? isLogin
              ? "Signing in..."
              : "Creating account..."
            : isLogin
            ? "Sign in"
            : "Create account"}
        </button>
      </form>
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 hover:underline font-medium"
            disabled={loading}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
