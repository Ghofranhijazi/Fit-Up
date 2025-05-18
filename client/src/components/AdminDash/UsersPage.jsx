import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get all users
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/api/users/all");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

 

  const roleColors = {
    user: "bg-green-100 text-green-800",
    gymOwner: "bg-pink-100 text-pink-800",
    nurseryOwner: "bg-blue-100 text-blue-800",
    admin: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
  <div>
    <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
    <p className="text-gray-500 mt-1">Manage user roles and permissions</p>
  </div>
  <button 
    onClick={fetchUsers}
    className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 text-gray-600"
  >
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
    Refresh
  </button>
</div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Role
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.role] || 'bg-gray-100 text-gray-800'}`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;







// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axios.get("http://localhost:5000/api/users/all");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl sm:text-2xl font-semibold mb-4">جميع المستخدمين</h1>

//       {isLoading ? (
//         <div className="text-center">جاري التحميل...</div>
//       ) : (
//         <>
//           {/* ✅ عرض كروت على الشاشات الصغيرة */}
//           <div className="grid grid-cols-1 gap-4 sm:hidden">
//             {users.map((user) => (
//               <div key={user.user_id} className="border rounded-xl p-4 shadow-sm flex gap-4 items-center">
//                 <img
//                   src={user.profileImage || "/default-user.png"}
//                   alt="profile"
//                   className="w-14 h-14 rounded-full object-cover"
//                 />
//                 <div>
//                   <h2 className="font-semibold">{user.username}</h2>
//                   <p className="text-sm text-gray-600">{user.email}</p>
//                   <p className="text-sm">الدور: {user.role}</p>
                 
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ✅ جدول على التابلت والديسك توب */}
//           <div className="hidden sm:block overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-3 text-left">الصورة</th>
//                   <th className="p-3 text-left">الاسم</th>
//                   <th className="p-3 text-left">الإيميل</th>
//                   <th className="p-3 text-left">الهاتف</th>
//                   <th className="p-3 text-left">الدور</th>

//                   <th className="p-3 text-left">العنوان</th>
//                   <th className="p-3 text-left">تاريخ الإنشاء</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.user_id} className="border-t hover:bg-gray-50">
//                     <td className="p-3">
//                       <img
//                         src={user.profileImage || "/default-user.png"}
//                         alt="profile"
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     </td>
//                     <td className="p-3">{user.username}</td>
//                     <td className="p-3">{user.email}</td>
//                     <td className="p-3">{user.phone || "—"}</td>
//                     <td className="p-3 capitalize">{user.role}</td>
                   
//                     <td className="p-3">{user.address || "—"}</td>
//                     <td className="p-3 text-sm text-gray-500">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
