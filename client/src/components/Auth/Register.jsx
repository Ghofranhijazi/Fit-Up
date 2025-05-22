import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        username: "", 
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setRegisterForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const body = {
            username: registerForm.username,
            email: registerForm.email,
            password: registerForm.password,
        };
         
        console.log("Register form data:", body); 

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register", 
                body,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
    
            console.log(response);
            navigate("/");
        } catch (error) {
            const backendMessage = error?.response?.data?.message;

if (backendMessage) {
    toast.error(backendMessage); 
} else {
    toast.error("An error occurred while registering. Please try again.");
}
        } finally {
            setIsLoading(false);
        }
    };

    
   return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-5">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-6 sm:p-8 space-y-6 sm:space-y-8 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl mx-2 sm:mx-4"
    >
      <div className="flex justify-center mb-3 sm:mb-4">
        <div className="bg-[#C0526F] p-2 sm:p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
      
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold sm:font-extrabold text-gray-900">Create a New Account</h1>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Sign up now to start using our platform</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 text-xs sm:text-sm flex items-center"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        <div className="space-y-4 sm:space-y-5">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="group relative"
          >
            <div className="flex items-center mb-1 gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#9C2A46] mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-gray-700">
                Full Name
              </label>
            </div>
            <input
              onChange={handleChange}
              value={registerForm.username}
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9C2A46] focus:border-[#9C2A46] transition duration-200 text-xs sm:text-sm"
              placeholder="Enter your full name"
            />
          </motion.div>

          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="group relative"
          >
            <div className="flex items-center mb-1 gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#9C2A46] mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">
                Email Address
              </label>
            </div>
            <input
              onChange={handleChange}
              value={registerForm.email}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9C2A46] focus:border-[#9C2A46] transition duration-200 text-xs sm:text-sm"
              placeholder="Enter your email address"
            />
          </motion.div>

          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="group relative"
          >
            <div className="flex items-center mb-1 gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#9C2A46] mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <input
              onChange={handleChange}
              value={registerForm.password}
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9C2A46] focus:border-[#9C2A46] transition duration-200 text-xs sm:text-sm"
              placeholder="Enter your password"
            />
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 sm:py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-[#C0526F] hover:bg-[#d1637f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9C2A46] transform transition duration-200 text-sm sm:text-base"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>Create Account</>
            )}
          </button>
        </motion.div>
      </form>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="text-center mt-1"
      >
        <p className="text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[#9C2A46] hover:text-[#C0526F] transition duration-200">
            Log In
          </Link>
        </p>
      </motion.div>
    </motion.div>
  </div>
);
}

