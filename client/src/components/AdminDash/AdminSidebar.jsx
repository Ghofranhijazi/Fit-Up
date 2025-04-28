// src/admin/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { Users, Calendar, MessageSquare, BarChart2, LayoutDashboard } from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
  { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
  { name: "Bookings", icon: <Calendar size={20} />, path: "/admin/bookings" },
  { name: "JoinRequests", icon: <Users size={20} />, path: "/admin/JoinRequests" },
  { name: "Reviews", icon: <MessageSquare size={20} />, path: "/admin/reviews" },
  { name: "Analytics", icon: <BarChart2 size={20} />, path: "/admin/analytics" },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-[#C0526F] text-white p-4">
      <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
                location.pathname === item.path
                  ? "bg-[#9C2A46]"
                  : "hover:bg-[#d1637f]"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
