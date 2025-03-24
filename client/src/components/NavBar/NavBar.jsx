import React, { useState } from "react";
import { ChevronDown } from "lucide-react";  // ✅ Only import ChevronDown
import { Link, Outlet } from "react-router-dom";  // ✅ Correct Link for navigation


export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
    <nav className="fixed top-0 left-0 w-full bg-[rgba(21,34,43,0.85)] text-white py-4 px-6 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold" style={{ fontFamily: "'Dancing Script', sans-serif"}}>FitUp</div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-[#C0526F]  hover:border-[#C0526F]">
            HOME
          </Link>
          <Link to="/About" className="hover:text-[#C0526F]  hover:border-[#C0526F]">
            ABOUT
          </Link>
          <Link to="/Contact" className="hover:text-[#C0526F]  hover:border-[#C0526F]">
            CONTACT
          </Link>
          <Link to="/JoinUs" className="hover:text-[#C0526F]  hover:border-[#C0526F]">
          JOIN US
          </Link>
          
          {/* Moved dropdown to the right side */}
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 hover:text-[#C0526F] hover:border-[#C0526F]">
              WHAT ARE YOU LOOKING FOR?
              <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden">
                 <Link to="/GymOnlyPage" className="block px-4 py-2 hover:bg-gray-200">Gym only </Link>
                 <Link to="/GymIndoorNurseryPage" className="block px-4 py-2 hover:bg-gray-200">Gym with indoor nursery</Link>
                 <Link to="/GymNearbyNurseryPage" className="block px-4 py-2 hover:bg-gray-200">Gym with nearby nursery</Link>
              </div>
            )}
          </div>
          
          {/* Changed GET STARTED to LOG IN */}
          <button className="px-4 py-2 border border-white text-white hover:bg-[#C0526F] hover:border-[#C0526F] rounded-lg">
            LOG IN
          </button>
        </div>
      </div>
    </nav>
    <Outlet />
</>
  );
  
}