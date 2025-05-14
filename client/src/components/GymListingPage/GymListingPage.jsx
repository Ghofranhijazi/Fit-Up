import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from "react-router-dom";

export default function GymListingPage() {
  const [gyms, setGyms] = useState([]); // To store gyms list
  const [loading, setLoading] = useState(true); // To track data loading
  const [error, setError] = useState(null); // To handle errors
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");  // قراءة الفئة المختارة

  // Fetch gyms data from API
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gyms/all'); // API endpoint for gyms
        console.log('dataaaaaaaa', JSON.stringify(gyms, null, 2));
        console.log('Full Response:', response.data); // Check the full response structure
        const allGyms = response.data.gyms; // Make sure gyms are located within response.data.gyms

// تصفية الجيمات حسب الفئة المختارة
        let filteredGyms = [];
        if (category === "Gym with indoor nursery") {
          filteredGyms = allGyms.filter(gym => gym.hasIndoorNursery);
        } else if (category === "Gym only") {
          filteredGyms = allGyms.filter(gym => !gym.hasIndoorNursery);
        } else {
          filteredGyms = allGyms; // عرض جميع الجيمات في حال لم تكن هناك فئة مختارة
        }

        setGyms(filteredGyms);
      } catch (error) {
        console.error('Error fetching gyms:', error);
        setError('Failed to fetch gyms'); // Error handling
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchGyms();
 }, [category]); // إعادة جلب الجيمات كلما تغيرت الفئة

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f8f1f3] to-[#f9f9f9]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#9C2A46]"></div>
    </div>
  );
  

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <>
       {/* Hero Section */}
       
       <section id="hero" className="relative w-full h-165 flex items-center justify-center text-white">
<img
  className="absolute inset-0 w-full h-full object-cover"
  src="https://static.spacecrafted.com/fc7241510ec245c5b42e95561258cdcc/i/b91d4ff9b87044a29ca70f1581d0a730/1/4SoifmQpDrHbZJ6Vye3at/VOD_DEC_Web-6%20%25281%2529.jpg?dpr=2"
  alt="Discover the Best Gyms With Us"
/>

        {/* Overlay with Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(40, 36, 41, 0.7)',
          }}
        ></div>

  {/* Hero Content */}
  <div className="relative z-10 text-center max-w-3xl px-6 mt-15">
      <h2 className="text-4xl text-[#C0526F] md:text-5xl font-bold mb-4 animate-fade-up" >
      Our gyms
      </h2>
      <span className="text-2xl font-bold">Welcome to the world of strength and beauty!</span>
            <div className="text-lg mt-2">
              Discover top women's gyms designed just for you, where energy meets inspiration. With tailored training programs, a vibrant atmosphere, and a supportive community, greatness awaits!
            </div>
    </div>
</section>
<div className='w-full h-1 bg-[#C0526F]'></div>

      {/* Gym Cards Section */}
      <div className="max-w-screen-xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
       {gyms && gyms.length > 0 ? (
  gyms.map((gym) => (
    <Link to={`/gym-details/${gym.id}`} key={gym.id}>
      <div
        key={gym.id}
        className="relative overflow-hidden shadow-md group cursor-pointer transition-shadow duration-300 hover:shadow-xl"
        style={{ width: "400px", height: "500px", willChange: "transform" }}
      >
        <img
          src={gym.gymPhoto ? `http://localhost:5000/uploads/${gym.gymPhoto.replace("\\", "/")}` : 'fallback-image.jpg'}
          loading="lazy"
          decoding="async"
          alt="Gym"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
          <h3 className="text-white text-3xl text-center font-bold transition duration-300 group-hover:scale-95">
            {gym.gymName || 'Gym Name'}
          </h3>
          {gym.hasIndoorNursery && (
  <div className="absolute top-5 right-5 group">
    <div className="relative">
      {/* Main Badge */}
      <div className="bg-[#9C2A46] text-white px-3 py-1.5 rounded-md shadow-lg backdrop-blur-[2px] border border-[#C0526F]/30 transition-all duration-300 group-hover:shadow-xl group-hover:bg-[#8A243D] group-hover:translate-y-[-1px]">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium tracking-tight">There is an indoor nursery</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#9C2A46] via-[#C0526F] to-[#9C2A46] opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:via-[#d9738f]"></div>
      </div>
      
      {/* Subtle glow effect (visible on hover) */}
      <div className="absolute inset-0 rounded-md bg-[#C0526F] opacity-0 group-hover:opacity-10 blur-[2px] transition-opacity duration-300 -z-10"></div>
    </div>
  </div>
)}
        </div>
      </div>
    </Link>
  ))
) : (
  <p>No gyms available</p>
)}
        </div>
      </div>
    </>
  );
}