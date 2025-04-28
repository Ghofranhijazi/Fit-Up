import React, { useState, useEffect } from "react";
import { ChevronDown, UserCircle2 } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../Auth/Logout";

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const location = useLocation();

  // Close dropdowns when clicking outside
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

  // Prevent dropdown close when clicking inside dropdown
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#15222b] to-[#1d2e3a] text-white py-4 px-6 shadow-lg z-50 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-[#C0526F] transition-transform duration-300"
            style={{ fontFamily: "'Dancing Script', sans-serif" }}
          >
            FitUp
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className={`hover:text-[#C0526F] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C0526F] after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/' ? 'text-[#C0526F] font-medium' : ''}`}
            >
              HOME
            </Link>
            <Link 
              to="/About" 
              className={`hover:text-[#C0526F] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C0526F] after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/About' ? 'text-[#C0526F] font-medium' : ''}`}
            >
              ABOUT
            </Link>
            <Link 
              to="/Contact" 
              className={`hover:text-[#C0526F] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C0526F] after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/Contact' ? 'text-[#C0526F] font-medium' : ''}`}
            >
              CONTACT
            </Link>
            <Link 
              to="/JoinUs" 
              className={`hover:text-[#C0526F] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C0526F] after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/JoinUs' ? 'text-[#C0526F] font-medium' : ''}`}
            >
              JOIN US
            </Link>

            {/* Dropdown */}
            <div className="relative" onClick={handleDropdownClick}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-1 hover:text-[#C0526F] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C0526F] after:transition-all after:duration-300 hover:after:w-full group"
              >
                LOOKING FOR ?
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-gradient-to-b from-[#1a2a36] to-[#15222b] text-white shadow-xl rounded-lg overflow-hidden border border-gray-700 backdrop-blur-md transition-all duration-300">
                  <Link 
                    to="/GymListingPage" 
                    className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 transition-all duration-300 border-b border-gray-700"
                  >
                    Gym only
                  </Link>
                  <Link 
                    to="/GymIndoorNurseryPage" 
                    className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 transition-all duration-300 border-b border-gray-700"
                  >
                    Gym with indoor nursery
                  </Link>
                  <Link 
                    to="/GymNearbyNurseryPage" 
                    className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 transition-all duration-300"
                  >
                    Gym with nearby nursery
                  </Link>
                </div>
              )}
            </div>

            {/* Conditional Rendering based on Login */}
            {!user.id ? (
              <Link
                to="/login"
                className="px-5 py-2 bg-[#C0526F] hover:bg-[#d1637f] rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                // from-[#C0526F] to-[#d1637f] hover:from-[#d1637f] hover:to-[#C0526F]
              >
                LOG IN
              </Link>
            ) : (
              <>
                {/* Profile Dropdown */}
                <div className="relative" onClick={handleDropdownClick}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileDropdownOpen(!profileDropdownOpen);
                      setDropdownOpen(false);
                    }}
                    className="hover:text-[#C0526F] flex items-center gap-1 transition-all duration-300"
                    aria-label="User profile"
                  >
                    <UserCircle2 className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-4 w-56 bg-gradient-to-b from-[#1a2a36] to-[#15222b] text-white shadow-xl rounded-lg overflow-hidden border border-gray-700 backdrop-blur-md">
                      {user.role === "gymOwner" ? (
                        <Link
                          to="/OwnerProfile"
                          className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 transition-all duration-300 border-b border-gray-700 flex items-center"
                        >
                          <UserCircle2 className="w-5 h-5 mr-2" /> Owner Profile
                        </Link>
                      ) : (
                        <Link
                          to="/UserProfile"
                          className="block px-6 py-3 hover:bg-[#C0526F] hover:bg-opacity-20 transition-all duration-300 border-b border-gray-700 flex items-center"
                        >
                          <UserCircle2 className="w-5 h-5 mr-2" /> User Profile
                        </Link>
                      )}
                      <div className="px-6 py-3 transition-all duration-300">
                        <Logout />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="pt-16">
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





