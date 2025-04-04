import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
         
        console.log("Register form data:", body);  // تحقق من البيانات قبل إرسالها

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
            if (error.response && error.response.status === 409) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred while registering. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl mx-4"
            >
                <div className="flex justify-center mb-4">
                    <div className="bg-[#662480] p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E3007E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Create a New Account</h1>
                    <p className="mt-2 text-sm text-gray-600">Sign up now to start using our platform</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-5">
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="group relative"
                        >
                            <div className="flex items-center mb-1 gap-2">
                                <svg className="w-4 h-4 text-[#662480] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#662480] focus:border-[#662480] transition duration-200"
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
                                <svg className="w-4 h-4 text-[#662480] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#662480] focus:border-[#662480] transition duration-200"
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
                                <svg className="w-4 h-4 text-[#662480] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#662480] focus:border-[#662480] transition duration-200"
                                placeholder="Enter your password"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                    >
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-[#662480] to-[#E3007E] hover:from-[#E3007E] hover:to-[#662480] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#662480] transform hover:scale-105 transition duration-200"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    Create Account
                                </>
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
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-[#662480] hover:text-[#E3007E] transition duration-200">
                            Log In
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}





// import { GoogleLogin } from '@react-oauth/google';


// const handleGoogleRegisterSuccess = async (response) => {
    //     setIsLoading(true);
    //     const { credential } = response;

    //     try {
    //         const res = await axios.post("http://localhost:5000/auth/google-register",
    //             { token: credential },
    //             { headers: { 'Content-Type': 'application/json' } }
    //         );

    //         const data = res.data;
    //         console.log("Google Registration successful:", data);
    //         navigate("/login");

    //     } catch (error) {
    //         console.error("Error during Google registration:", error);
    //         setError("حدث خطأ أثناء التسجيل عبر جوجل. يرجى المحاولة مرة أخرى.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // const handleGoogleRegisterFailure = (error) => {
    //     console.error("Google Registration Failure:", error);
    //     setError("فشل التسجيل عبر جوجل. حاول مرة أخرى أو استخدم طريقة أخرى.");
    // }


   {/* <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleRegisterSuccess}
                            onError={handleGoogleRegisterFailure}
                            useOneTap
                            shape="pill"
                            size="large"
                        />
                    </div> */}


                //     <motion.div
                //     initial={{ y: 10, opacity: 0 }}
                //     animate={{ y: 0, opacity: 1 }}
                //     transition={{ delay: 0.9, duration: 0.3 }}
                //     className="text-center mt-1"
                // >
                //     <p className="text-sm text-gray-600 mb-1">
                //         التسجيل باستخدام
                //     </p>
                 
                // </motion.div>