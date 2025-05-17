import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
      .then(() => {
        dispatch(clearUser());
        localStorage.removeItem("user");
        navigate("/login");
        toast.success('Logged out successfully');
      })
      .catch((err) => {
        console.error("Logout error:", err);
        toast.error("Something went wrong while logging out");
      });
  };

  return (
    <button
      onClick={handleLogout}
      className={`w-full text-center bg-[#9C2A46] hover:bg-[#d1637f] text-white py-2 px-4 rounded-md shadow transition-all duration-300 ${className}`}
    >
      Logout
    </button>
  );
};

export default Logout;




