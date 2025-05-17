import { useEffect, useState } from "react";
import axios from "axios";
import { Check, X, Loader2, RefreshCw, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/booking/all", {
        withCredentials: true,
      });
      setBookings(res.data);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const statusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case "accepted":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const paymentBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case "completed":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Bookings Management</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">View and manage all booking requests</p>
        </div>
        <button
          onClick={fetchBookings}
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 text-gray-600 disabled:opacity-50 text-xs sm:text-sm"
        >
          {loading ? (
            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-3 sm:mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            <p className="text-xs sm:text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Table Container - Mobile Responsive */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden sm:table min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["User", "Email", "Facility", "Price", "Date", "Payment", "Status"].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                      <p className="text-sm text-gray-500">Loading bookings...</p>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500">No bookings found</p>
                      <button
                        onClick={fetchBookings}
                        className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        Try again
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-sm">
                          {booking.user?.username?.charAt(0).toUpperCase() || "-"}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.user?.username || "-"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {booking.user?.email || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {booking.gym?.gymName || booking.nursery?.nurseryName || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {booking.selectedPlan || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={paymentBadge(booking.paymentStatus)}>
                        {booking.paymentStatus
                          ? booking.paymentStatus.charAt(0).toUpperCase() +
                            booking.paymentStatus.slice(1)
                          : "Unknown"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={statusBadge(booking.status)}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3 p-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-6">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                <p className="text-sm text-gray-500 mt-2">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6">
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-gray-500 mt-2">No bookings found</p>
                <button
                  onClick={fetchBookings}
                  className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
                >
                  Try again
                </button>
              </div>
            ) : (
              bookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="bg-white rounded-lg border border-gray-200 p-3 shadow-xs"
                >
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleRow(booking.id)}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs">
                        {booking.user?.username?.charAt(0).toUpperCase() || "-"}
                      </div>
                      <div className="ml-2">
                        <div className="text-xs font-medium text-gray-900">
                          {booking.user?.username || "-"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {booking.gym?.gymName || booking.nursery?.nurseryName || "-"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={statusBadge(booking.status)}>
                        {booking.status}
                      </span>
                      {expandedRows.includes(booking.id) ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {expandedRows.includes(booking.id) && (
                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Email:</span>
                        <span className="text-gray-700">{booking.user?.email || "-"}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Plan:</span>
                        <span className="text-gray-700">{booking.selectedPlan || "-"}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Date:</span>
                        <span className="text-gray-700">
                          {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Payment:</span>
                        <span className={paymentBadge(booking.paymentStatus)}>
                          {booking.paymentStatus
                            ? booking.paymentStatus.charAt(0).toUpperCase() +
                              booking.paymentStatus.slice(1)
                            : "Unknown"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;