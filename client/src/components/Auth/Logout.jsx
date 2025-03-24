import React from 'react';
import Cookies from 'js-cookie';

const Logout = () => {
  const handleLogout = () => {
    // Remove token from cookies
    Cookies.remove('token');
    alert('Logged out successfully');
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
      Logout
    </button>
  );
};

export default Logout;