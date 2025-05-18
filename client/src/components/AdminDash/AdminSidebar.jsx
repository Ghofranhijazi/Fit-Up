// import { Link, useLocation } from "react-router-dom";
// import {
//   Users,
//   Calendar,
//   MessageSquare,
//   BarChart2,
//   UserPlus,
//   LayoutDashboard,
//   Mail,
// } from "lucide-react";
// import Logout from "../Auth/Logout";
// import { FiX } from "react-icons/fi";
// import { useEffect, useState } from "react";

// const menuItems = [
//   { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
//   { name: "Analytics", icon: <BarChart2 size={20} />, path: "/admin/analytics" },
//   { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
//   { name: "Bookings", icon: <Calendar size={20} />, path: "/admin/bookings" },
//   { name: "Join Requests", icon: <UserPlus size={20} />, path: "/admin/JoinRequests" },
//   { name: "Reviews", icon: <MessageSquare size={20} />, path: "/admin/reviews" },
//   { name: "Contact Messages", icon: <Mail size={20} />, path: "/admin/contact-messages" },
// ];

// const AdminSidebar = ({ onClose, isMobile }) => {
//   const location = useLocation();
//   const [activePath, setActivePath] = useState(location.pathname);

//   // Update active path when location changes
//   useEffect(() => {
//     setActivePath(location.pathname);
//   }, [location]);

//   // Check if a menu item is active
//   const isActive = (path) => {
//     return activePath === path || 
//            (path !== "/admin" && activePath.startsWith(path));
//   };

//   return (
//     <div className={`${isMobile ? 'fixed inset-0 z-50' : 'relative'} w-48 lg:w-56 min-h-screen bg-[#C0526F] text-white p-4 flex flex-col transition-all duration-300`}>
//       {/* Mobile Close Button */}
//       {isMobile && (
//         <button 
//           className="absolute top-2 right-2 p-1 text-white hover:bg-[#9C2A46] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
//           onClick={onClose}
//           aria-label="Close sidebar"
//         >
//           <FiX size={20} />
//         </button>
//       )}

//       {/* Header */}
//       <div className="mb-6 px-1 mt-2 md:mt-0">
//         <h1 className="text-lg lg:text-xl font-bold truncate">Admin Panel</h1>
//         <p className="text-xs text-white/80 mt-1">Management Console</p>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-grow overflow-y-auto">
//         <ul className="space-y-1">
//           {menuItems.map((item) => (
//             <li key={item.name}>
//               <Link
//                 to={item.path}
//                 className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-200 ${
//                   isActive(item.path)
//                     ? "bg-[#9C2A46] shadow-md"
//                     : "hover:bg-[#d1637f] hover:shadow-sm"
//                 }`}
//                 onClick={isMobile ? onClose : undefined}
//                 aria-current={isActive(item.path) ? "page" : undefined}
//               >
//                 <span className="text-white flex-shrink-0">{item.icon}</span>
//                 <span className="text-sm font-medium whitespace-nowrap">
//                   {item.name}
//                 </span>
//                 {isActive(item.path) && (
//                   <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
//                 )}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Logout Button */}
//       <div className="mt-auto pt-4 border-t border-[#ffffff33]">
//         <Logout 
//           className="w-full hover:bg-[#9C2A46] transition-colors duration-200" 
//           onClick={isMobile ? onClose : undefined}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;


import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
 import Logout from "../Auth/Logout";

const links = [
  { path: "/admin", label: "Admin Dashboard " },
   { path: "/admin/analytics", label: "Analytics" },
  { path: "/admin/users", label: "Users" },
  { path: "/admin/JoinRequests", label: "Join Requests"},
  { path: "/admin/bookings", label: "Booking" },
  { path: "/admin/reviews", label: "Ratings" },
  { path: "/admin/contact-messages", label: "Contact Messages"},
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
     {/* للموبايل - زر عائم لفتح القائمة */}
<div className="sm:hidden fixed top-4 right-4 z-50">
  <button
    onClick={() => setOpen(!open)}
    className="bg-[#9C2A46] text-white rounded-full p-2 shadow-lg hover:bg-[#d1637f] transition-all"
  >
    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  </button>
</div>


      {/* القائمة الجانبية */}
      <div
        className={`sm:w-64 w-full sm:block ${
          open ? "block" : "hidden"
        } bg-[#C0526F]  border-r  h-full sm:h-screen sm:relative fixed z-50 top-0 left-0 flex flex-col justify-between`}
      >
        <div>
          <div className="p-4 text-xl text-white font-bold border-b border-[#ffffff33]"> Admin Dashboard</div>
          <nav className="flex flex-col p-4 gap-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ${
                    isActive
                      ? " text-white bg-[#9C2A46] shadow-md "
                      : "text-white hover:bg-[#d1637f]"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* زر الخروج في الأسفل */}
        <div className="p-3 border-t border-[#ffffff33] ">
          <Logout />
        </div>
      </div>
    </>
  );
}

