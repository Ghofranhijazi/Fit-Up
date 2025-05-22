import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userSlice";
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };
console.log("Login Form Data:", loginForm);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const body = { email: loginForm.email, password: loginForm.password };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        body,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      const data = response.data;
      console.log("Response from server:", data);

      if (response.status === 200) {
        const userData = { id: data.userId, email: data.email, role: data.role };
      
        // Redux
        dispatch(setUser(userData));
      
        // localStorage
        localStorage.setItem("user", JSON.stringify(userData));
      
        console.log("User data storedddd:", userData);
      
        if (loginForm.email === "admin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error while logging in:", error);
      setError(
      error.response?.data?.message || "An error occurred while logging in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="bg-[#C0526F] p-2 sm:p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          Log In
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Welcome back! Please enter your account details
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-red-50 text-red-600 p-2 sm:p-3 rounded-lg mb-3 sm:mb-4 text-xs sm:text-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-[#9C2A46] transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              onChange={handleChange}
              value={loginForm.email}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full pl-9 sm:pl-10 py-2 sm:py-3 border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#9C2A46] focus:border-[#9C2A46] text-left transition-all duration-200 text-xs sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-[#9C2A46] transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              onChange={handleChange}
              value={loginForm.password}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full pl-9 sm:pl-10 py-2 sm:py-3 border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#9C2A46] focus:border-[#9C2A46] text-left transition-all duration-200 text-xs sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex justify-center items-center py-2 sm:py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-[#C0526F] hover:bg-[#d1637f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9C2A46] transform transition duration-200 text-sm sm:text-base"
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <span className="flex items-center">
              Log In
            </span>
          )}
        </motion.button>
      </form>

      <div className="mt-4 sm:mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or log in using
            </span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-4 sm:mt-6"
      >
        <p className="text-xs sm:text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[#9C2A46] hover:text-[#C0526F] transition-colors duration-200"
          >
            <span className="inline-flex items-center">
              Create a new account
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </p>
      </motion.div>
    </motion.div>
  </div>
);
}

