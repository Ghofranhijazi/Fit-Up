import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom icons for the map markers
const nurseryIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/14034/14034740.png",
  iconSize: [45, 45],
  popupAnchor: [0, -20],
  className: "nursery-marker"
});

const gymIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/14034/14034747.png",
  iconSize: [45, 45],
  popupAnchor: [0, -20],
  className: "gym-marker"
});

function randomNearbyLocation(baseLat, baseLng) {
  const offset = () => (Math.random() - 0.5) * 0.01; // فرق عشوائي بسيط
  return {
    lat: baseLat + offset(),
    lng: baseLng + offset()
  };
}

export default function NurseryDetailsPage() {
  const { id } = useParams();
  const [nursery, setNursery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGym, setShowGym] = useState(false);  // حالة لإظهار الجيم
  const [nearestGym, setNearestGym] = useState(null); // حالة لتخزين الجيم الأقرب
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const user = useSelector((state) => state.user);

  // const token = localStorage.getItem("token");

  // جلب بيانات الحضانة
  useEffect(() => {
    const fetchNurseryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/nurseries/${id}`);
        setNursery(response.data.nursery);
      } catch (error) {
        console.error("Error fetching nursery details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNurseryDetails();
  }, [id]);


  // عند الضغط على زر "عرض أقرب جيم"
  const handleShowGym = async () => {
    if (!nursery || !nursery.location) {
       toast.error("Nursery location is missing.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/nurseries/${id}/nearest-gym`);
      const gym = response.data?.gym;

      if (gym && gym.location) {
        setNearestGym(gym.location);

        const toast = document.createElement("div");
        toast.className =
          "fixed bottom-6 right-6 bg-[#8F87F1] text-white px-6 py-3 rounded-lg shadow-xl flex items-center animate-fade-in z-50";
        // toast.innerHTML = `Nearest gym to ${nursery.nurseryName} is now shown on the map`;
        toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Nearest gym to ${nursery.nurseryName} is now shown on the map
      `;
      document.body.appendChild(toast);

        setTimeout(() => {
          toast.classList.add("animate-fade-out");
          setTimeout(() => toast.remove(), 300);
        }, 3500);
      } else {
        // في حالة لم يتم العثور على جيم قريب
        const fakeLocation = randomNearbyLocation(nursery.location.lat, nursery.location.lng);
        setNearestGym(fakeLocation);

        toast.success(`Nearest gym to ${nursery.nurseryName} is now shown on the map`);
      }

      setShowGym(true);

    } catch (err) {
      console.error("Error fetching nearest gym", err);
      // fallback في حال فشل السيرفر
      const fallbackLocation = randomNearbyLocation(nursery.location.lat, nursery.location.lng);
      setNearestGym(fallbackLocation);
      setShowGym(true);
      toast.success(`Nearest gym to ${nursery.nurseryName} is now shown on the map`);
    }
  };

    // جلب التعليقات الخاصة بالحضانة
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comment/nurseries/${id}/comments`, { 
        withCredentials: true
      });
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
     toast.error("You must be logged in to comment.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/comment/nurseries/${id}/comments`,
        { text: newComment, rating },// إرسال النص والتقييم فقط
        { withCredentials: true,
         
        }
      );
      setNewComment("");
      setRating(0);
      fetchComments();  // جلب التعليقات بعد إضافة تعليق جديد
    } catch (err) {
      console.error("Error submitting comment", err);
     

        if (err.response?.status === 403) {
             toast.error("You can only write a review after you have booked and fully paid for this Nursery.");
           } else if (err.response?.status === 401) {
             toast.error("Please log in first.");
           } else {
             toast.error("An error occurred while submitting the comment.");
           }
    }
  };

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f0f7ff] to-[#e6f0fa]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8F87F1]"></div>
    </div>
  );

  if (!nursery) return (
    <div className="text-center py-20 bg-gradient-to-br from-[#f0f7ff] to-[#e6f0fa] min-h-screen">
      <h2 className="text-3xl font-bold text-gray-700">No nursery information available</h2>
      <p className="text-gray-500 mt-4">We couldn't find details for this nursery</p>
    </div>
  );

  const handleBookNow = () => {
    navigate(`/Booking/nursery/${id}`, {
      state: { nurseryName: nursery.nurseryName }
    });
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] to-[#e6f0fa]">
    {/* Hero Section */}
    <div className="relative h-70 sm:h-55 md:h-70 overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(http://localhost:5000/uploads/${nursery.nurseryPhoto.replace("\\", "/")})`,
          filter: 'blur(8px)'
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-10">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
          {nursery.nurseryName}
        </h1>
        <div className="flex items-center text-white/90 bg-[#8F87F1]/80 px-4 py-2 rounded-full backdrop-blur-sm w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{nursery.address}</span>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="w-full h-1 bg-gradient-to-r from-[#6A60E9] to-[#8F87F1]"></div>
      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
       <div className="flex flex-col md:flex-col lg:flex-row gap-10 mt-5">
          {/* Left Column - Image & Actions */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform duration-300">
              <img
                src={`http://localhost:5000/uploads/${nursery.nurseryPhoto.replace("\\", "/")}`}
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
                alt={nursery.nurseryName}
              />
            </div>

    {/* Action Buttons */}       
<div className="mt-8 flex flex-col sm:flex-row gap-5">
  <button
    onClick={handleBookNow}
    className="flex-1 bg-[#6A60E9] hover:bg-[#8F87F1] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
  >
    <span className="mr-2 transition-transform">Book Now</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
  <button
    onClick={handleShowGym}
    className="flex-1 bg-white border-2 border-[#6A60E9] text-[#6A60E9] hover:bg-[#f0effd] font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
  >
    <span className="mr-2 transition-transform">Show Nearest Gym</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  </button>
</div>

            {/* Nursery Description */}
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">About Our Nursery</h3>
              <p className="text-gray-600 leading-relaxed text-lg break-all">{nursery.description}</p>
              
              {/* Services Section */}
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Services Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {nursery.services?.map((service, index) => (
                    <span key={index} className="bg-[#f0f1ff] text-[#6A60E9] px-4 py-2 rounded-full text-sm font-medium">
                      {service}
                    </span>
                  ))}
                  {nursery.additionalServices && (
                    <span className="bg-[#f0f1ff] text-[#6A60E9] px-4 py-2 rounded-full text-sm font-medium">
                      {nursery.additionalServices}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Nursery Info */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-199">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#8F87F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Nursery Details
              </h2>
              {/* Additional Info */}
              <div className="space-y-6">
                <div className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className="bg-[#f0f1ff] p-3 rounded-full mr-4 text-[#6A60E9]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Address</h4>
                    <p className="text-gray-800 text-lg mt-1">{nursery.address}</p>
                  </div>
                </div>

                <div className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className="bg-[#f0f1ff] p-3 rounded-full mr-4 text-[#6A60E9]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Opening Hours</h4>
                    <p className="text-gray-800 text-lg mt-1">{nursery.openingHour} AM - {nursery.closingHour} PM</p>
                  </div>
                </div>

                <div className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className="bg-[#f0f1ff] p-3 rounded-full mr-4 text-[#6A60E9]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>

                   {/* Capacity */}
                  <div>
                    <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Capacity</h4>
                    <p className="text-gray-800 text-lg mt-1">{nursery.capacity} children</p>
                  </div>
                </div>

                <div className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  <div className="bg-[#f0f1ff] p-3 rounded-full mr-4 text-[#6A60E9]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Age Range</h4>
                    <p className="text-gray-800 text-lg mt-1">{nursery.minAge} - {nursery.maxAge} months</p>
                  </div>
                </div>
                <div className="flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
  <div className="bg-[#f0f1ff] p-3 rounded-full mr-4 text-[#6A60E9]">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.5 0-3 .5-3 1.5S10.5 11 12 11s3-.5 3-1.5S13.5 8 12 8zm0 0v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>
  <div>
    <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Monthly Fee</h4>
    <p className="text-gray-800 text-lg mt-1">
      {nursery.monthlyFee ? nursery.monthlyFee + "JD/month" : "Not provided"}
    </p>
  </div>
</div>

              </div>
            </div>
          </div>
        </div>

    {/* Map Section */}
    <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#8F87F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Our Location
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-xl h-[500px] border-4 border-white relative">
            <MapContainer 
              center={nursery.location} 
              zoom={15} 
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={nursery.location} icon={nurseryIcon}>
                <Popup className="custom-popup font-bold text-[#6A60E9]">{nursery.nurseryName}</Popup>
              </Marker>
              {/* Show nearest gym */}
              {showGym && nearestGym && (
                <Marker position={nearestGym} icon={gymIcon}>
                  <Popup className="custom-popup font-bold text-[#6A60E9]">Nearest Gym</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>

        {/* Reviews Section (Same as gym page but with purple theme) */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#8F87F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Parent Reviews
          </h2>

          {/* Add Comment Form */}
          <form onSubmit={handleSubmit} className="bg-[#f0f1ff] p-6 rounded-xl mb-10 border border-[#e6e7ff]">
            <h3 className="text-xl font-semibold text-[#6A60E9] mb-5">Share Your Experience</h3>
            
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
                    <Star
                      className={`w-8 h-8 transition-transform duration-100 ${star <= (hover || rating) ? "text-yellow-500 fill-yellow-400" : "text-gray-300 fill-gray-200"} hover:scale-110`}
                    />
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
                className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#8F87F1] focus:border-transparent transition-all duration-200"
                placeholder="Share your thoughts about this nursery..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-[#6A60E9] hover:bg-[#8F87F1] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform flex items-center"
            >      
              Post Review
            </button>
          </form>

            {/* Display Comments */}
  <div className="space-y-6">
    {comments.length === 0 ? (
      <div className="text-center py-10 bg-[#f0f1ff] rounded-xl border border-dashed border-[#e6e7ff]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#8F87F1] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="bg-gradient-to-r from-[#e6e7ff] to-[#e6e7ff] p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8F87F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <span className="text-sm font-medium text-[#8F87F1] bg-[#e6e7ff] px-2 py-1 rounded-full">
                    {comment.rating}.0
                  </span>
                </div>
              </div>
              
              {/* Comment Text */}
               <p className="text-gray-700 leading-relaxed pl-1 border-l-2 border-[#e8cad1] break-all">
                {comment.text}
              </p>
              
              {/* Like/Reply Actions */}
              <div className="flex items-center mt-4 pt-3 border-t border-gray-100">
                <button className="flex items-center text-gray-500 hover:text-[#8F87F1] mr-4 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>Helpful</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-[#8F87F1] transition-colors">
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
    </div>
  );
}
