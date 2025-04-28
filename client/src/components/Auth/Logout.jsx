import React from 'react';
import axios from 'axios'; // Ensure axios is imported
// import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../Redux/userSlice'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // If using React Router

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation after logout

  const handleLogout = () => {
    axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
      .then(() => {
        dispatch(clearUser());
        localStorage.removeItem("user");   // ⚠️ هذا هو الحل الأساسي للمشكلة
        navigate("/login");
        alert('Logged out successfully');
      })
      .catch((err) => {
        console.error("Logout error:", err);
        alert("Something went wrong while logging out");
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#C0526F] hover:bg-[#d1637f] text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default Logout;