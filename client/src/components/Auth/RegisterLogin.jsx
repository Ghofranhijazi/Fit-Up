import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/userActions'; 

const RegisterLogin = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  

  const handleToggleForm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setIsAnimating(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        isSignUp
          ? 'http://localhost:5000/api/auth/register'
          : 'http://localhost:5000/api/auth/login',
        { email, password, username },
        { withCredentials: true }
      );
      Cookies.set('token', data.token, { expires: 1 });
      alert(isSignUp ? 'Registered successfully' : 'Logged in successfully');

      // بعد النجاح، نقوم بتخزين بيانات المستخدم في الـ Redux
      dispatch(setUser(data.user)); // تحديث الـ Redux بالحالة الجديدة

      // التوجيه إلى صفحة الهوم
      navigate('/');
    } catch (error) {
      setRegistrationMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Form Section */}
      <div
        className={`flex-1 flex flex-col justify-center items-center bg-white p-10 transition-all duration-1000 ease-in-out ${
          isSignUp && !isAnimating ? '' : 'transform translate-x-full'
        }`}
      >
        {registrationMessage && <p className="text-red-600 mb-4">{registrationMessage}</p>}

        {isSignUp ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign up</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-[#9C2A46] text-white py-2 rounded hover:bg-gray-900">
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-[#9C2A46] text-white py-2 rounded hover:bg-gray-900">
              Login
            </button>
          </form>
        )}
      </div>

      {/* Right Side Section */}
      <div
        className={`flex-1 flex flex-col justify-center items-center text-white p-10 relative transition-all duration-1000 ease-in-out ${
          isSignUp && !isAnimating ? '' : 'transform -translate-x-full'
        }`}
        style={{ backgroundColor: '#C0526F' }}
      >
        {/* الخلفية المتحركة */}
        <div className="absolute w-48 h-48 bg-[#9C2A46] rounded-bl-full opacity-50" style={{ top: '0px', right: '0px' }}></div>
        <div className="absolute w-48 h-48 bg-[#9C2A46] rounded-tr-full opacity-50" style={{ bottom: '0px', left: '0px' }}></div>

        {/* النص المتغير بين الفورمات */}
        <h2
          className={`text-2xl font-bold z-10 transform transition-all duration-1000 ease-in-out ${
            isSignUp ? 'translate-x-0' : '-translate-x-[100vw]'
          }`}
        >
          {isSignUp ? 'Already a member? Let\'s get things done!' : 'New here? Let\'s organize your tasks!'}
        </h2>

        {/* النص الثابت بين الفورمات */}
        <h2
          className={`text-2xl font-bold z-10 transform transition-all duration-1000 ease-in-out ${
            isSignUp ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {isSignUp ? 'Already a member? Let\'s get things done!' : 'New here? Let\'s organize your tasks!'}
        </h2>

        <button
          className="mt-4 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-[#C0526F] transition-all duration-300 ease-in-out z-10"
          onClick={handleToggleForm}
        >
          {isSignUp ? 'LOG IN' : 'SIGN UP'}
        </button>
      </div>
    </div>
  );
};

export default RegisterLogin;
