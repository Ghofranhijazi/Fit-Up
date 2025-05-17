import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { User, Edit2, Calendar, CheckCircle, XCircle, Eye } from 'react-feather';
import Logout from '../Auth/Logout';

const GymProfile = () => {
  const userId = useSelector((state) => state.user.id);
  const [owner, setOwner] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    // profileImage: '',
    role: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  // const [isUploading, setIsUploading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  const brandColor = '#9C2A46';
  const brandColorLight = '#F8E8EE';

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:5000/api/users/${userId}`, { withCredentials: true })
      .then((res) => setOwner(res.data))
      .catch((err) => console.error(err));

    axios.get(`http://localhost:5000/api/owners/${userId}/bookings`, { withCredentials: true })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Error fetching bookings:', err));
  }, [userId]);

  const handleChange = (e) => setOwner({ ...owner, [e.target.name]: e.target.value });

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   setIsUploading(true);
  //   const formData = new FormData();
  //   formData.append('profileImage', file);

  //   try {
  //     const res = await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
  //       withCredentials: true,
  //       headers: { 'Content-Type': 'multipart/form-data' }
  //     });
  //     setOwner(res.data.user);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('phone', owner.phone);
    formData.append('address', owner.address);
    formData.append('username', owner.username);
    formData.append('email', owner.email);
    formData.append('role', owner.role);
    // if (owner.profileImage instanceof File) {
    //   formData.append('profileImage', owner.profileImage);
    // }

    try {
      const res = await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setOwner(res.data.user);
      setIsSaved(true);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (bookingId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status },
        { withCredentials: true }
      );
      setBookings((prev) => prev.map((b) => b.id === bookingId ? res.data.booking : b));
    } catch (error) {
      console.error('Failed to update booking status', error);
    }
  };

  if (!owner.role) return <div>Loading...</div>;
  if (owner.role !== 'gymOwner') return <div>Unauthorized</div>;

  const upcomingBookings = bookings.filter(b => b.status === 'pending' || b.status === 'accepted');
  // const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'rejected' || b.status === 'cancelled');

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  };

  const handleCloseDetails = () => {
    setShowBookingDetails(false);
    setSelectedBooking(null);
  };

return (
  <div className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32 bg-gray-50 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 rounded-xl shadow-lg bg-white">
      {/* Profile Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-0">
          <div className="relative mb-4 sm:mb-0">
            {/* Profile Picture */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4"
              style={{ borderColor: brandColorLight }}
            >
              {/* {owner?.profileImage ? (
                <img
                  src={owner.profileImage instanceof File ? 
                    URL.createObjectURL(owner.profileImage) : 
                    `http://localhost:5000${owner.profileImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : ( */}
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    backgroundColor: brandColorLight,
                    color: brandColor,
                  }}
                >
                  <User size={48} className="sm:w-12 sm:h-12 md:w-16 md:h-16" />
                </div>
              {/* )} */}
            </div>

            {/* Upload Button - Made slightly smaller on mobile */}
            <label
              className="absolute bottom-0 right-0 p-2 sm:p-3 rounded-full cursor-pointer transition-all drop-shadow-md"
              // style={{ backgroundColor: brandColor }}
            >
              {/* <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden"
              /> */}
              {/* {isUploading ? ( */}
                {/* <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                > */}
                  {/* <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path> */}
                {/* </svg> */}
              {/* ) : (
                // <Camera size={16} className="sm:w-5 sm:h-5 text-white" />
              // )} */}
            </label>
          </div>

          <div className="sm:ml-4 md:ml-6 text-center sm:text-left flex-1 min-w-0">
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 truncate"
              style={{ color: brandColor }}
            >
              {owner?.username || 'Gym Owner'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 truncate">{owner?.email}</p>
          </div>
          <div className="sm:ml-auto mt-2 sm:mt-0">
            <Logout className="text-sm" />
          </div>
        </div>
      </div>

      {/* Tab Navigation - Improved for mobile */}
      <div className="flex border-b mb-6 md:mb-8 overflow-x-auto pb-1">
        {["profile", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? "border-b-2 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
            style={{
              borderColor: activeTab === tab ? brandColor : "transparent",
              color: activeTab === tab ? brandColor : undefined,
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "profile" && "Profile"}
            {tab === "upcoming" && "Bookings"}
          </button>
        ))}
      </div>

      {/* Profile Tab Content */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-lg">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2
              className="text-lg md:text-xl font-semibold"
              style={{ color: brandColor }}
            >
              Personal Information
            </h2>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                style={{ color: brandColor }}
                className="flex items-center hover:opacity-80 font-medium text-sm md:text-base"
              >
                <Edit2 size={14} className="mr-1 md:mr-1.5" /> Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {['username', 'email', 'phone', 'address'].map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 capitalize">{field}</label>
                {editMode ? (
                  <input 
                    type="text" 
                    name={field} 
                    value={owner[field] || ''} 
                    onChange={handleChange} 
                    className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-[#9C2A46] focus:border-transparent text-sm sm:text-base"
                  />
                ) : (
                  <p
                    className="p-3 sm:p-4 rounded-lg text-gray-800 border text-sm sm:text-base"
                    style={{
                      backgroundColor: brandColorLight,
                      borderColor: 'transparent',
                    }}
                  >
                    {owner?.[field] || 'N/A'}
                  </p>
                )}
              </div>
            ))}
          </div>

          {editMode && (
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleSave}
                style={{ backgroundColor: brandColor }}
                className="hover:bg-opacity-90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          )}
          {isSaved && <p className="mt-3 md:mt-4 text-green-600 text-xs sm:text-sm text-center">Profile updated successfully!</p>}
        </div>
      )}

      {/* Bookings Tab Content */}
      {activeTab === "upcoming" && (
        <div className="bg-white rounded-lg">
          {/* Modal Component - Responsive improvements */}
          {showBookingDetails && selectedBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-2 p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold" style={{ color: brandColor }}>
                    Booking Details
                  </h3>
                  <button
                    onClick={handleCloseDetails}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <XCircle size={18} />
                  </button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {/* Gym Section */}
                  <div className="border-b pb-3 sm:pb-4">
                    <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 flex items-center text-sm sm:text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-[#9C2A46]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Gym Information
                    </h4>
                    <p className="font-semibold text-sm sm:text-base">{selectedBooking.gym?.gymName ||'Gym Name Not Available' }</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{selectedBooking.gym?.address || 'address Not Available'}</p>
                  </div>

                  {/* Client Section */}
                  <div className="border-b pb-3 sm:pb-4">
                    <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 flex items-center text-sm sm:text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-[#9C2A46]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Client Information
                    </h4>
                    <p className="font-semibold text-sm sm:text-base">{selectedBooking.user?.username}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{selectedBooking.user?.email}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{selectedBooking.user?.phone || 'No phone provided'}</p>
                  </div>

                  {/* Booking Details Section */}
                  <div className="border-b pb-3 sm:pb-4">
                    <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 flex items-center text-sm sm:text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-[#9C2A46]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Booking Details
                    </h4>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Booking Date</p>
                        <p className="font-medium text-sm sm:text-base">
                          {new Date(selectedBooking.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Status</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedBooking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : selectedBooking.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {selectedBooking.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 flex items-center text-sm sm:text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-[#9C2A46]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Payment Details
                    </h4>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Status</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedBooking.paymentStatus === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {selectedBooking.paymentStatus || 'completed'}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Method</p>
                        <p className="font-medium text-sm sm:text-base capitalize">
                          {selectedBooking.paymentMethod || 'PayPal'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Subscription Plan Price</p>
                        <p className="font-medium text-sm sm:text-base">
                          {selectedBooking.selectedPlan ? `${selectedBooking.selectedPlan} JOD` : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 text-right">
                  <button
                    onClick={handleCloseDetails}
                    style={{ backgroundColor: brandColor }}
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg text-white font-medium hover:bg-opacity-90 transition-colors text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bookings List Content */}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold" style={{ color: brandColor }}>
              Bookings
            </h2>
          </div>

          {upcomingBookings.length === 0 ? (
            <div
              className="text-center py-12 sm:py-16 rounded-xl"
              style={{ backgroundColor: brandColorLight }}
            >
              <Calendar
                size={48}
                className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16"
                style={{ color: brandColor }}
              />
              <p className="font-medium text-base sm:text-lg text-gray-700">
                You have no Bookings
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all bg-white relative overflow-hidden"
                  style={{ borderColor: brandColorLight }}
                >
                  {/* Status indicator stripe */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5"
                    style={{
                      backgroundColor:
                        booking.status === "accepted"
                          ? "rgb(34, 197, 94)"
                          : booking.status === "rejected"
                          ? "rgb(239, 68, 68)"
                          : "rgb(234, 179, 8)",
                    }}
                  ></div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 pl-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg md:text-xl" style={{ color: brandColor }}>
                        {booking.Gym?.gymName}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1 truncate">
                        {booking.user?.username} • {booking.user?.email}
                      </p>

                      <div className="mt-2 sm:mt-3 flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : booking.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                        {booking.paymentStatus === 'paid' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="p-1.5 sm:p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} className="text-blue-600" />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(booking.id, 'accepted')}
                            className="p-1.5 sm:p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
                            title="Accept"
                          >
                            <CheckCircle size={16} className="text-green-600" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(booking.id, 'rejected')}
                            className="p-1.5 sm:p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                            title="Reject"
                          >
                            <XCircle size={16} className="text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
};

export default GymProfile;