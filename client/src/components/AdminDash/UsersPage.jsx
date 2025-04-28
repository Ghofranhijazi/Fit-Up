import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  // Get all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/all");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/update-role/${userId}`, {
        role: newRole,
      });
      fetchUsers(); // refresh
    } catch (err) {
      console.error("Error updating role", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#C0526F] mb-6">User Management</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FBEFF1]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#9C2A46] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#9C2A46] uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#9C2A46] uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#9C2A46] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  {["user", "gymOwner", "nurseryOwner", "admin"].map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(user.user_id, role)}
                      className={`px-3 py-1 rounded-md text-xs font-medium ${
                        user.role === role
                          ? "bg-[#FBEFF1] text-[#C0526F]"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                      disabled={user.role === role}
                    >
                      Set as {role}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
