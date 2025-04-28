import { useEffect, useState } from "react";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";

const JoinRequests = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingGyms = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/gyms/pending");
      console.log(res.data); // all data of objects
      setGyms(res.data.gyms); 
    } catch (err) {
      setError("Failed to fetch pending gyms.");
    } finally {
      setLoading(false);
    }
  };

  const approveGym = async (gymId) => {
    try {
      await axios.patch(`http://localhost:5000/api/gyms/publish-gym/${gymId}`);
      fetchPendingGyms();
    } catch (err) {
      console.error("Approve error:", err);
      alert("Failed to approve gym.");
    }
  };

  useEffect(() => {
    fetchPendingGyms();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#9C2A46] mb-6">Join Requests Management</h1>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FBEFF1]">
            <tr>
              {["Gym Name", "Owner", "Email", "Category","Payment status" ,"Action"].map((h, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium text-[#9C2A46] uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#C0526F]" />
                </td>
              </tr>
            ) : gyms.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No pending gyms found.
                </td>
              </tr>
            ) : (
              gyms.map((gym) => (
                <tr key={gym.id} className="hover:bg-[#FBEFF1] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {gym.gymName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                  {gym.user?.username || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                  {gym.user?.email || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                    {gym.category || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">
      {/* كود الدفع */}
      {gym.payment?.[0]?.status === "completed" ? (
        <span style={{ color: "green" }}> paid </span>
      ) : (
        <span style={{ color: "red" }}> Unpaid </span>
      )}
    </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => approveGym(gym.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C0526F] text-white hover:bg-[#d1637f] transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JoinRequests;
