import { useEffect, useState } from "react";
import axios from "axios";
import { Check, Loader2, RefreshCw, AlertCircle, Info } from "lucide-react";

const JoinRequests = () => {
  const [gyms, setGyms] = useState([]);
  const [nurseries, setNurseries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchPendingGyms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gyms/pending", {
        withCredentials: true,
      });
      const gymData = res.data.gyms.map(gym => ({ ...gym, type: "gym" }));
      setGyms(gymData);
    } catch (err) {
      console.error("Error fetching pending gyms:", err);
      setError("Failed to fetch pending gyms");
    }
  };

  const fetchPendingNurseries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/nurseries/pending", {
        withCredentials: true,
      });
      const nurseryData = res.data.nurseries.map(nursery => ({ ...nursery, type: "nursery" }));
      setNurseries(nurseryData);
    } catch (err) {
      console.error("Error fetching pending nurseries:", err);
      setError("Failed to fetch pending nurseries");
    }
  };

  const approveRequest = async (id, type) => {
    try {
      setLoading(true);
      const endpoint = type === "gym" 
        ? `http://localhost:5000/api/gyms/publish-gym/${id}`
        : `http://localhost:5000/api/nurseries/publish-nursery/${id}`;
      
  await axios.patch(
  endpoint,
  {},                                          
  {
     withCredentials: true,
  }
);
      
      setSuccess(`${type === "gym" ? "Gym" : "Nursery"} approved successfully!`);
      setTimeout(() => setSuccess(null), 3000);
      
      fetchAll();
    } catch (err) {
      setError(`Failed to approve ${type}. Please try again.`);
      console.error(err);
      setLoading(false);
    }
  };

  const fetchAll = async () => {
    setError(null);
    setLoading(true);
    try {
      await Promise.all([fetchPendingGyms(), fetchPendingNurseries()]);
    } catch (err) {
      setError("Failed to load requests. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const allRequests = [...gyms, ...nurseries];

  return (
  <div className="max-w-7xl mx-auto p-4 sm:p-6">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Join Requests</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">Review and approve new facility applications</p>
      </div>
      <button
        onClick={fetchAll}
        disabled={loading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 text-gray-600 disabled:opacity-50 text-sm sm:text-base"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        )}
        Refresh
      </button>
    </div>

    {/* Error Message */}
    {error && (
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 sm:mr-3" />
          <p className="text-sm sm:text-base text-red-700">{error}</p>
        </div>
      </div>
    )}

    {/* Success Message */}
    {success && (
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
        <div className="flex items-center">
          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3" />
          <p className="text-sm sm:text-base text-green-700">{success}</p>
        </div>
      </div>
    )}

    {/* Table Container */}
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden shadow-xs sm:shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Facility", "Owner", "Email", "Category", "Payment", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 sm:py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-indigo-600" />
                    <p className="text-sm sm:text-base text-gray-500">Loading requests...</p>
                  </div>
                </td>
              </tr>
            ) : allRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 sm:py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Info className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    <p className="text-sm sm:text-base text-gray-500">No pending requests</p>
                    <button
                      onClick={fetchAll}
                      className="mt-2 text-xs sm:text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Check again
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              allRequests.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs sm:text-sm">
                        {item.type === "gym" ? "G" : "N"}
                      </div>
                      <div className="ml-2 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {item.type === "gym" ? item.gymName : item.nurseryName}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {item.category || item.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">{item.user?.username || "-"}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {item.user?.email || "-"}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 capitalize">
                    {item.type}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${
                      item.payment?.[0]?.status === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {item.payment?.[0]?.status === "completed" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm">
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => approveRequest(item.id, item.type)}
                        disabled={loading}
                        className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-[#C0526F] text-white hover:bg-[#d1637f] transition-colors text-xs sm:text-sm"
                      >
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Approve</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default JoinRequests;