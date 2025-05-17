import { useState, useEffect } from "react";
import { ChevronDown, UserCircle2, Menu, X } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../Auth/Logout";

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState('');
  const user = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
      setProfileDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const linkStyle = (path) =>
    `block md:inline  text-base hover:text-[#C0526F] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C0526F] after:transition-all after:duration-300 hover:after:w-full ${
      location.pathname === path ? "text-[#C0526F] font-medium" : ""
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-[#15222b] to-[#1d2e3a] text-white py-4 px-6 shadow-lg z-50 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-[#C0526F]"
            style={{ fontFamily: "'Dancing Script', sans-serif" }}
          >
            FitUp
          </div>

          {/* Hamburger Menu */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8  items-center m-3">
            <Link to="/" className={linkStyle("/")}>HOME</Link>
            <Link to="/About" className={linkStyle("/About")}>ABOUT</Link>
            <Link to="/Contact" className={linkStyle("/Contact")}>CONTACT</Link>

            {/* Dropdown */}
            <div className="relative" onClick={handleDropdownClick}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-1 hover:text-[#C0526F] transition-all duration-300"
              >
                LOOKING FOR ?
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-[#1a2a36] text-white shadow-xl rounded-lg border border-gray-700">
                  <Link to={`/GymListingPage?category=Gym only`} onClick={() => handleCategorySelect('Gym only')} className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 border-b">Gym only</Link>
                  <Link to={`/GymListingPage?category=Gym with indoor nursery`} onClick={() => handleCategorySelect('Gym with indoor nursery')} className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 border-b">Gym with indoor nursery</Link>
                  <Link to="/NurseryListingPage" onClick={() => handleCategorySelect('Gym with nearby nursery')} className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20">Gym with nearby nursery</Link>
                </div>
              )}
            </div>

            {/* User login/profile */}
            {!user.id ? (
              <Link to="/login" className="px-5 py-2 bg-[#C0526F] hover:bg-[#d1637f] rounded-lg transition">LOG IN</Link>
            ) : (
              <div className="relative" onClick={handleDropdownClick}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setDropdownOpen(false);
                  }}
                  className="hover:text-[#C0526F] flex items-center gap-1 transition"
                >
                  <UserCircle2 className="w-7 h-7" />
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-56 bg-[#1a2a36] text-white shadow-xl rounded-lg border border-gray-700">
                    {user.role === "gymOwner" ? (
                      <Link to="/GymProfile" className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 border-b flex items-center"><UserCircle2 className="w-5 h-5 mr-2" />Owner Profile</Link>
                    ) : user.role === "nurseryOwner" ? (
                      <Link to="/NurseryProfile" className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 border-b flex items-center"><UserCircle2 className="w-5 h-5 mr-2" />Nursery Profile</Link>
                    ) : (
                      <Link to="/UserProfile" className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 border-b flex items-center"><UserCircle2 className="w-5 h-5 mr-2" />User Profile</Link>
                    )}
                    <div className="px-6 py-3"><Logout /></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
  <div className="md:hidden mt-4 space-y-3 px-4 py-4 bg-[#1a2a36] rounded-lg shadow-md">
  <Link to="/" onClick={() => setMobileMenuOpen(false)} className={linkStyle("/")}>HOME</Link>
  <Link to="/About" onClick={() => setMobileMenuOpen(false)} className={linkStyle("/About")}>ABOUT</Link>
  <Link to="/Contact" onClick={() => setMobileMenuOpen(false)} className={linkStyle("/Contact")}>CONTACT</Link>

  {/* Dropdown section */}
  <div className="space-y-2">
    <p className="uppercase text-sm font-semibold text-[#C0526F]">Looking For?</p>
    <Link to={`/GymListingPage?category=Gym only`} onClick={() => handleCategorySelect('Gym only')} className="block px-4 py-2 rounded-md hover:bg-[#C0526F] hover:bg-opacity-20 transition">Gym only</Link>
    <Link to={`/GymListingPage?category=Gym with indoor nursery`} onClick={() => handleCategorySelect('Gym with indoor nursery')} className="block px-4 py-2 rounded-md hover:bg-[#C0526F] hover:bg-opacity-20 transition">Gym with indoor nursery</Link>
    <Link to="/NurseryListingPage" onClick={() => handleCategorySelect('Gym with nearby nursery')} className="block px-4 py-2 rounded-md hover:bg-[#C0526F] hover:bg-opacity-20 transition">Gym with nearby nursery</Link>
  </div>

{/* User menu for logged-in users only */}
{user.id && (
  <div className="space-y-2 pt-4 border-t border-gray-700 mt-4">
    {user.role === "gymOwner" && (
      <Link to="/GymProfile" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-md hover:bg-[#C0526F] hover:bg-opacity-20 transition">Owner Profile</Link>
    )}
    {user.role === "nurseryOwner" && (
      <Link to="/NurseryProfile" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-md hover:bg-[#C0526F] hover:bg-opacity-20 transition">Nursery Profile</Link>
    )}
    {user.role === "user" && (
      <Link to="/UserProfile" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-md hover:bg-[#C0526F] hover:bg-opacity-20 transition">User Profile</Link>
    )}

    <div className="px-4">
      <div className="w-full">
        <Logout />
      </div>
    </div>
  </div>
)}

  {!user.id && (
  <div className="pt-4 border-t border-gray-700 mt-4">
    <Link
      to="/login"
      onClick={() => setMobileMenuOpen(false)}
      className="block w-full text-center bg-[#C0526F] hover:bg-[#d1637f] text-white px-4 py-2 rounded-md transition"
    >
      LOG IN
    </Link>
  </div>
)}

</div>
        )}
      </nav>

      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
}





// import React, { useState } from "react";
// import { ChevronDown, UserCircle2 } from "lucide-react";
// import { Link, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Logout from "../Auth/Logout"; 

// export default function NavBar() {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const user = useSelector((state) => state.user);

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full bg-[rgba(21,34,43,0.85)] text-white py-4 px-6 shadow-md z-50">
//         <div className="container mx-auto flex justify-between items-center">
//           {/* Logo */}
//           <div
//             className="text-2xl font-bold"
//             style={{ fontFamily: "'Dancing Script', sans-serif" }}
//           >
//             FitUp
//           </div>

//           {/* Navigation Links */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <Link to="/" className="hover:text-[#C0526F]">
//               HOME
//             </Link>
//             <Link to="/About" className="hover:text-[#C0526F]">
//               ABOUT
//             </Link>
//             <Link to="/Contact" className="hover:text-[#C0526F]">
//               CONTACT
//             </Link>
//             <Link to="/JoinUs" className="hover:text-[#C0526F]">
//               JOIN US
//             </Link>

//             {/* Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-1 hover:text-[#C0526F]"
//               >
//                 LOOKING FOR ?
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden">
//                   <Link to="/GymListingPage" className="block px-4 py-2 hover:bg-gray-200">
//                     Gym only
//                   </Link>
//                   <Link to="/GymIndoorNurseryPage" className="block px-4 py-2 hover:bg-gray-200">
//                     Gym with indoor nursery
//                   </Link>
//                   <Link to="/GymNearbyNurseryPage" className="block px-4 py-2 hover:bg-gray-200">
//                     Gym with nearby nursery
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* Conditional Rendering based on Login */}
//             {!user.id ? (
//               <Link
//                 to="/login"
//                 className="px-4 py-2 border border-white hover:bg-[#C0526F] rounded-lg"
//               >
//                 LOG IN
//               </Link>
//             ) : (
//               <>
//                 {/* Profile Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                     className="hover:text-[#C0526F] flex items-center gap-1"
//                   >
//                     <UserCircle2 className="w-6 h-6" />
//                   </button>
//                   {profileDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden">
//                       {user.role === "gymOwner" ? (
//                         <Link
//                           to="/OwnerProfile"
//                           className="block px-4 py-2 hover:bg-gray-200"
//                         >
//                           Owner Profile
//                         </Link>
//                       ) : (
//                         <Link
//                           to="/UserProfile"
//                           className="block px-4 py-2 hover:bg-gray-200"
//                         >
//                           User Profile
//                         </Link>
//                       )}
//                  <div className="px-4 py-2 hover:bg-gray-200">
//                       <Logout /> {/* ✅ استخدام نفس زر الـLogout */}
//                     </div>
//                   </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//       <Outlet />
//     </>
//   );
// }





