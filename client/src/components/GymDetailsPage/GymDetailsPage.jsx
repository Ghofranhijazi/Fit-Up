import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// أعلى الملف
import { Star } from "lucide-react";
import { useSelector } from "react-redux";

// Custom icons with better styling
const gymIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/14034/14034747.png",
  iconSize: [45, 45],
  popupAnchor: [0, -20],
  className: "gym-marker"
});

const nurseryIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/14034/14034740.png",
  iconSize: [45, 45],
  popupAnchor: [0, -20],
  className: "nursery-marker"
});

export default function GymDetailsPage() {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNursery, setShowNursery] = useState(false);
  const navigate = useNavigate();
  // داخل الكومبوننت
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");
const [rating, setRating] = useState(0);
const [hover, setHover] = useState(null);


const user = useSelector((state) => state.user);

const fetchComments = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/comment/gyms/${id}/comments`, { 
      withCredentials: true // هذا مهم لكي يتم إرسال التوكن الموجود في الـ Cookies
    });
    setComments(res.data);
  } catch (err) {
    console.error("Error fetching comments", err);
  }
};

useEffect(() => {
  if (id) fetchComments();
}, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user || !user.id) {
    alert("You must be logged in to comment.");
    return;
  }

  try {

    console.log("user object:", user);
    console.log("username:", user.username);

    await axios.post(
      `http://localhost:5000/api/comment/gyms/${id}/comments`,
      {
        text: newComment,
        rating,
        // username: user.username, 
        // userId: user.id, 
      },
      { withCredentials: true }
    );

    setNewComment("");
    setRating(0);
    fetchComments();
  } catch (err) {
    console.error("Error submitting comment", err);
    alert("Failed to submit comment.");
  }
};



  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/gyms/${id}`);
        setGym(response.data.gym);
      } catch (error) {
        console.error("Error fetching gym details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGymDetails();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f8f1f3] to-[#f9f9f9]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#9C2A46]"></div>
    </div>
  );
  
  if (!gym) return (
    <div className="text-center py-20 bg-gradient-to-br from-[#f8f1f3] to-[#f9f9f9] min-h-screen">
      <h2 className="text-3xl font-bold text-gray-700">No gym information available</h2>
      <p className="text-gray-500 mt-4">We couldn't find details for this gym</p>
    </div>
  );

  const nearestNursery = {
    lat: gym.location.lat + 0.002,
    lng: gym.location.lng + 0.002,
  };

  const handleShowNursery = () => {
    setShowNursery(true);
    // Modern toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 bg-[#9C2A46] text-white px-6 py-3 rounded-lg shadow-xl flex items-center animate-fade-in z-50';
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Nearest nursery to ${gym.gymName} is now shown on the map
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  const handleBookNow = () => {
    navigate(`/Booking/${id}`, {
      state: { gymName: gym.gymName, plans: gym.plans },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f1f3] to-[#f9f9f9]">
      {/* Gym Hero Section with Image Background */}
{/* Gym Hero Section with Image Background - Blur Control */}
<div className="relative h-55 overflow-hidden">
  {/* Background Image with blur control - adjust --blur-amount in style tag */}
  <div 
    className="absolute inset-0 w-full h-full bg-cover bg-center"
    style={{
      backgroundImage: `url(http://localhost:5000/uploads/${gym.gymPhoto.replace("\\", "/")})`,
      filter: 'blur(var(--blur-amount))',
      '--blur-amount': '8px' /* Change this value to adjust blur intensity */
    }}
  ></div>
  
  {/* Color overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
  
  {/* Content */}
  <div className="container mx-auto px-6 h-full flex items-end pb-12 relative z-10 mt-5">
    <div className="text-white">
      <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">{gym.gymName}</h1>
      <div className="flex items-center text-white/90 bg-[#9C2A46]/80 px-4 py-2 rounded-full backdrop-blur-sm w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">{gym.address}</span>
      </div>
    </div>
  </div>
</div>
<div className='w-full h-1 bg-gradient-to-r from-[#9C2A46] to-[#C0526F]'></div>


      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 -mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          {/* Left Column - Image & Actions */}
          <div className="lg:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform duration-300">
              <img
                src={`http://localhost:5000/uploads/${gym.gymPhoto.replace("\\", "/")}`}
                className="w-full h-96 object-cover"
                alt={gym.gymName}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-5">
              <button
                onClick={handleBookNow}
                className="flex-1 bg-[#C0526F]  hover:bg-[#d1637f] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                <span className="mr-2  transition-transform">Book Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={handleShowNursery}
                className="flex-1 bg-white border-2 border-[#C0526F] text-[#C0526F] hover:bg-[#f8e8eb] font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
              >
                <span className="mr-2  transition-transform">Nearest Nursery</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Gym Description */}
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">About Our Gym</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{gym.description}</p>
            </div>
          </div>

          {/* Right Column - Gym Info */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-170">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#C0526F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Gym Details
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className="bg-[#f8e8eb] p-3 rounded-full mr-4 text-[#9C2A46]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Address</h4>
                    <p className="text-gray-800 text-lg mt-1">{gym.address}</p>
                  </div>
                </div>

                <div className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className="bg-[#f8e8eb] p-3 rounded-full mr-4 text-[#9C2A46]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Opening Hours</h4>
                    <p className="text-gray-800 text-lg mt-1">{gym.openingHour} AM - {gym.closingHour} PM</p>
                  </div>
                </div>

                <div className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className="bg-[#f8e8eb] p-3 rounded-full mr-4 text-[#9C2A46]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Membership Plans</h4>
                    <div className="mt-3 space-y-3">
                      {gym.plans?.map((p) => (
                        <div key={p.name} className="flex justify-between items-center bg-[#f8f1f3] p-4 rounded-lg border-l-4 border-[#C0526F] hover:bg-[#f3e5e9] transition-colors duration-200">
                          <span className="font-medium text-gray-700 text-lg">{p.name}</span>
                          <span className="font-bold text-[#9C2A46] text-xl">{p.price} JOD</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#C0526F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Our Location
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-xl h-[500px] border-4 border-white relative">
            <MapContainer 
              center={gym.location} 
              zoom={15} 
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={gym.location} icon={gymIcon}>
                <Popup className="custom-popup font-bold text-[#9C2A46]">{gym.gymName}</Popup>
              </Marker>
              {showNursery && (
                <Marker position={nearestNursery} icon={nurseryIcon}>
                  <Popup className="custom-popup font-bold text-[#9C2A46]">Nearest Nursery</Popup>
                </Marker>
              )}
            </MapContainer>
            <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md z-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C0526F]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">View larger map</span>
            </div>
          </div>
        </div>



        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
  <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#C0526F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    Member Reviews
  </h2>

  {/* Add Comment Form */}
  <form onSubmit={handleSubmit} className="bg-[#f8f1f3] p-6 rounded-xl mb-10 border border-[#f3e5e9]">
    <h3 className="text-xl font-semibold text-[#9C2A46] mb-5">Share Your Experience</h3>
    
    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-2">Your Rating</label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-8 h-8 transition-transform duration-100 ${star <= (hover || rating) ? "text-yellow-500 fill-yellow-400" : "text-gray-300 fill-gray-200"} hover:scale-110`}
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
    
    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-2">Your Comment</label>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={4}
        className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C0526F] focus:border-transparent transition-all duration-200"
        placeholder="Share your thoughts about this gym..."
        required
      />
    </div>
    
    <button
      type="submit"
      className="bg-gradient-to-r from-[#9C2A46] to-[#C0526F] hover:from-[#C0526F] hover:to-[#9C2A46] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
      </svg>
      Post Review
    </button>
  </form>

  {/* Display Comments */}
  <div className="space-y-6">
    {comments.length === 0 ? (
      <div className="text-center py-10 bg-[#f8f1f3] rounded-xl border border-dashed border-[#e8cad1]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#C0526F] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h4 className="text-xl font-medium text-gray-600">No reviews yet</h4>
        <p className="text-gray-500 mt-1">Be the first to share your experience!</p>
      </div>
    ) : (
      comments.map((comment, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start">
            {/* User Avatar */}
            <div className="bg-gradient-to-r from-[#f8e8eb] to-[#f9f1f3] p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#9C2A46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <div className="flex-1">
              {/* User Info & Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-800">{comment.username}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <div className="flex items-center mt-2 sm:mt-0">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${i < comment.rating ? "text-yellow-500 fill-yellow-400" : "text-gray-300 fill-gray-200"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[#9C2A46] bg-[#f8e8eb] px-2 py-1 rounded-full">
                    {comment.rating}.0
                  </span>
                </div>
              </div>
              
              {/* Comment Text */}
              <p className="text-gray-700 leading-relaxed pl-1 border-l-2 border-[#e8cad1]">
                {comment.text}
              </p>
              
              {/* Like/Reply Actions */}
              <div className="flex items-center mt-4 pt-3 border-t border-gray-100">
                <button className="flex items-center text-gray-500 hover:text-[#C0526F] mr-4 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>Helpful</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-[#C0526F] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>


      </div>

      {/* Add this to your CSS file or style tag */}
      <style jsx>{`
        .gym-marker {
          filter: drop-shadow(0 0 8px rgba(156, 42, 70, 0.4));
        }
        .nursery-marker {
          filter: drop-shadow(0 0 8px rgba(192, 82, 111, 0.4));
        }
        .custom-popup {
          border-radius: 8px !important;
          border: 2px solid #f8e8eb !important;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-fade-out {
          animation: fadeOut 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}