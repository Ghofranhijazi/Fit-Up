// import { Outlet } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";
// import { useState, useEffect } from 'react';
// import { FiMenu, FiX } from 'react-icons/fi';

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768 && sidebarOpen) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [sidebarOpen]);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Mobile Sidebar Toggle Button */}
//       <button 
//         className={`md:hidden fixed top-4 right-4 z-50 p-2 bg-[#C0526F] text-white rounded-full shadow-lg transition-all duration-300 ${
//           sidebarOpen ? 'opacity-0' : 'opacity-100'
//         }`}
//         onClick={() => setSidebarOpen(true)}
//         aria-label="Open sidebar"
//       >
//         <FiMenu size={24} />
//       </button>

//       {/* Sidebar - Fixed width and properly aligned */}
//       <div className={`
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
//         md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-90
//         bg-[#C0526F] shadow-xl md:shadow-none transition-transform duration-300 ease-in-out
//       `}>
//         <AdminSidebar 
//           onClose={() => setSidebarOpen(false)}
//           isMobile={isMobile}
//         />
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content Area - Adjusted to remove gap */}
//  <div className={`
//   flex-1 overflow-auto min-h-screen transition-all duration-300
//   ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-64'}
// `}>
//   <div className="p-4 sm:p-6 w-full max-w-full">
//     <Outlet />
//   </div>
// </div>
//     </div>
//   );
// };

// export default AdminLayout;




import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <Outlet />
      </div>
    </div>
  );
}
