import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function GymListingPage() {
  const [gyms, setGyms] = useState([]); // To store gyms list
  const [loading, setLoading] = useState(true); // To track data loading
  const [error, setError] = useState(null); // To handle errors

  // Fetch gyms data from API
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gyms/all'); // API endpoint for gyms
        console.log('dataaaaaaaa', JSON.stringify(gyms, null, 2));
        console.log('Full Response:', response.data); // Check the full response structure
        setGyms(response.data.gyms); // Make sure gyms are located within response.data.gyms

        if (response.data && response.data.gyms) {
          setGyms(response.data.gyms); // Set gyms data
        } else {
          setError('No gyms available'); // In case of empty gyms data
        }
      } catch (error) {
        console.error('Error fetching gyms:', error);
        setError('Failed to fetch gyms'); // Error handling
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchGyms();
  }, []);

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
              style={{ willChange: "transform" }}
            />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
              <h3
               className="text-white text-3xl text-center font-bold transition duration-300 group-hover:scale-95"
                style={{ willChange: "transform" }}
             >
               {gym.gymName || 'Gym Name'}
            </h3>
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