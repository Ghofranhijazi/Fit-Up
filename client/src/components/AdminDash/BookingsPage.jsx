import { useEffect, useState } from "react";
import axios from "axios";
import { Check, X, Loader2 } from "lucide-react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/booking/all");
      setBookings(res.data);
    } catch (err) {
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/booking/update/${id}`, {
        status,
      });
      fetchBookings();
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update booking status.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#9C2A46] mb-6">Bookings Management</h1>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FBEFF1]">
            <tr>
              {[
                "Username",
                "Email",
                "Gym",
                "Plan",
                "Date",
                "Payment",
                "Status",
              ].map((h, i) => (
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
                <td colSpan="8" className="text-center py-6">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#C0526F]" />
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-[#FBEFF1] transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {booking.user?.username || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {booking.user?.email || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {booking.gym?.gymName || booking.nursery?.nurseryName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {booking.selectedPlan || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">

                  <td className="px-6 py-4 text-sm">
             <span
                   className={`px-3 py-1 rounded-full text-xs font-semibold ${
                   booking.paymentStatus === "completed"
                   ? "bg-green-100 text-green-700"
                   : booking.paymentStatus === "pending"
                   ? "bg-yellow-100 text-yellow-700"
                   : "bg-red-100 text-red-700"
                    }`}
            >
                   {booking.paymentStatus
                   ? booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)
                   : "Unknown"}
            </span>
              </td>

                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
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

export default BookingsPage;

