import { useEffect, useState } from "react";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";

const JoinRequests = () => {
  const [gyms, setGyms] = useState([]);
  const [nurseries, setNurseries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchPendingGyms = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/gyms/pending");
    const gymData = res.data.gyms.map(gym => ({ ...gym, type: "gym" }));
    setGyms(gymData);
  } catch (err) {
    console.error("Error fetching pending gyms:", err);
    setError("Failed to fetch pending gyms: " + err.message);
  }
};

const fetchPendingNurseries = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/nurseries/pending");
    const nurseryData = res.data.nurseries.map(nursery => ({ ...nursery, type: "nursery" }));
    setNurseries(nurseryData);
  } catch (err) {
    console.error("Error fetching pending nurseries:", err);
    setError("Failed to fetch pending nurseries: " + err.message);
  }
};


const approveGym = async (id) => {
  try {
    await axios.patch(`http://localhost:5000/api/gyms/publish-gym/${id}`);
    fetchAll(); // لإعادة تحميل البيانات بعد الموافقة
  } catch (err) {
    alert("Failed to approve gym.");
    console.log(err);
  }
};


  const approveNursery = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/nurseries/publish-nursery/${id}`);
      fetchAll();
    } catch (err) {
      alert("Failed to approve nursery.");
      console.log(err);
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchPendingGyms(), fetchPendingNurseries()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const allRequests = [...gyms, ...nurseries];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#9C2A46] mb-6">Join Requests Management</h1>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FBEFF1]">
            <tr>
              {["Name", "Owner", "Email", "Category", "Payment status", "Action"].map((h, i) => (
                <th key={i} className="px-6 py-3 text-left text-xs font-medium text-[#9C2A46] uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#C0526F]" />
                </td>
              </tr>
            ) : allRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No pending requests found.
                </td>
              </tr>
            ) : (
              allRequests.map((item) => (
                <tr key={item.id} className="hover:bg-[#FBEFF1] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.type === "gym" ? item.gymName : item.nurseryName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.user?.username || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.user?.email || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">{item.category || item.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                    {item.payment?.[0]?.status === "completed" ? (
                      <span className="text-green-600">Paid</span>
                    ) : (
                      <span className="text-red-600">Unpaid</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() =>
                        item.type === "gym"
                          ? approveGym(item.id)
                          : approveNursery(item.id)
                      }
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
