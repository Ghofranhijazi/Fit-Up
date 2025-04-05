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

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <>
      {/* Hero Section with increased height */}
      <section id="hero" className="relative w-full h-180 flex items-center justify-center text-white">
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover pt-18"
          src="https://img.freepik.com/free-photo/medium-shot-fit-woman-training_23-2150169349.jpg?t=st=1743523172~exp=1743526772~hmac=15bb6cc8f6d4c6f995163a7e8ddf9a38f8fabe6d08997c56cf63def625c541d6&w=740"
          alt="Background"
        />
        {/* Overlay with Gradient */}
        <div className="absolute inset-0" style={{ background: 'rgba(40, 36, 41, 0.8)' }}></div>
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h7 className="text-4xl md:text-5xl font-bold text-center mt-5 animate-fade-up">
            <span className="text-[#C0526F]" style={{ fontFamily: "'Dancing Script', sans-serif" }}>Sports clubs</span>
          </h7>
        </div>
      </section>

      {/* Black Section */}
      <div className="w-full bg-black h-60 py-10 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center h-full">
          {/* Announcement Text */}
          <div className="md:w-2/3 text-white text-center mb-5">
            <p className="text-lg">
              <span className="font-bold">Welcome to the world of strength and beauty!</span> Discover top women's gyms designed just for you, where energy meets inspiration. With tailored training programs, a vibrant atmosphere, and a supportive community, greatness awaits!
            </p>
          </div>
        </div>
      </div>

      {/* Gym Cards Section */}
      <div className="max-w-screen-xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {gyms && gyms.length > 0 ? (
            gyms.map((gym) => (
              <Link to={`/gym-details/${gym.id}`} key={gym.id}>
              <div
                key={gym.id}
                className="relative overflow-hidden shadow-lg group cursor-pointer transition-shadow duration-500 hover:shadow-2xl"
                style={{ width: "400px", height: "500px" }}
              >
                {/* Check if gymPhoto exists before rendering */}
                <img
                  src={gym.gymPhoto ? `http://localhost:5000/uploads/${gym.gymPhoto.replace("\\", "/")}` : 'fallback-image.jpg'}
                  loading="lazy"
                  alt="Gym"
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center" >
                  <h3 className="text-white text-3xl text-center font-extrabold transition-transform duration-800 drop-shadow-[0_0_30px_#ffff] group-hover:scale-90 group-hover:drop-shadow-[0_0_30px_#ffff]"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    {gym.gymName || 'Gym Name Unavailable'}
                  </h3>
                </div>
              </div>
              </Link>
            ))
          ) : (
            <p>No gyms available</p> // In case of no gyms
          )}
        </div>
      </div>
    </>
  );
}