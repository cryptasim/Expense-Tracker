import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side content */}
          <div className="space-y-10">
            <div className="relative">
              <h1 className="text-5xl md:text-6xl leading-tight">
                <span className="block text-gray-900 font-light tracking-tight">
                  Your Money.
                </span>
                <span className="block text-indigo-600 font-semibold tracking-tight">
                  Your Control.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                Easily track your daily expenses, visualize your spending with
                interactive charts, and make changes anytime — all in one
                simple, intuitive app.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:border-indigo-200 transition-all">
                <div className="text-sm font-medium text-indigo-600 mb-4">
                  Average Savings
                </div>
                <div className="text-4xl font-light text-gray-900">₹5000</div>
                <div className="text-sm text-gray-500 mt-1">Monthly</div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:border-indigo-200 transition-all">
                <div className="text-sm font-medium text-indigo-600 mb-4">
                  Time Saved
                </div>
                <div className="text-4xl font-light text-gray-900">5hrs</div>
                <div className="text-sm text-gray-500 mt-1">Weekly</div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-indigo-600 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <div className="text-gray-900 text-sm font-medium">
                    Smart Insights
                  </div>
                  <div className="text-gray-500 text-xs">
                    Discover hidden savings opportunities
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-indigo-600 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <div className="text-gray-900 text-sm font-medium">
                    Automated Tracking
                  </div>
                  <div className="text-gray-500 text-xs">
                    Let us handle the number crunching
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-indigo-600 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <div className="text-gray-900 text-sm font-medium">
                    Goal Oriented
                  </div>
                  <div className="text-gray-500 text-xs">
                    Stay on track with personalized goals
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-indigo-600 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <div className="text-gray-900 text-sm font-medium">
                    100% Free
                  </div>
                  <div className="text-gray-500 text-xs">Use it forever!!</div>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Form */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
            <div className="text-center mb-8">
              <div className="inline-block p-3 rounded-full bg-indigo-600/10 mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">
                {isLogin ? "Welcome Back" : "Start Saving Today"}
              </h2>
              <p className="text-gray-600">
                {isLogin
                  ? "Continue your saving journey"
                  : "Join thousands saving ₹5000+ monthly"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form inputs with updated styles */}
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-indigo-600/50 focus:border-transparent 
                           placeholder-gray-500 text-gray-900 transition-all duration-300"
                    required
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg 
                focus:ring-2 focus:ring-indigo-600/50 focus:border-transparent 
                placeholder-gray-500 text-gray-900 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg 
                focus:ring-2 focus:ring-indigo-600/50 focus:border-transparent 
                placeholder-gray-500 text-gray-900 transition-all duration-300"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg 
                         hover:bg-indigo-700 transition-all duration-300 font-medium"
              >
                {loading
                  ? "Processing..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {isLogin
                  ? "Need an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
