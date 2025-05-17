import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import LazyImage from '../LazyImage';

export default function BestGyms() {
  const [gymImages, setGymImages] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      AOS.init({ duration: 1000, once: true });
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gyms/random');
        setGymImages(res.data);
      } catch (err) {
        console.error('Error fetching random gyms:', err);
      }
    };

    fetchGyms();
  }, []);

  return (
    <div className='bg-[#f1f4fa]'>
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20" data-aos="fade-up">
        <div className="px-4 xs:px-6 sm:px-8 mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-[#9C2A46] mb-3 sm:mb-4">
              Discover Gyms Here With Us
            </h2>
            <p 
              className="max-w-2xl mx-auto mt-3 text-sm xs:text-base sm:text-lg text-gray-600"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              Find the perfect gym to match your fitness goals. Whether you want to build strength, stay active, or improve your health, we've got you covered.
            </p>
          </div>

          {/* Gym Images Grid */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-6 sm:mt-10 md:mt-12"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {Array.isArray(gymImages) && gymImages.map((gym, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <LazyImage
                  src={
                    gym.gymPhoto.startsWith('http')
                      ? gym.gymPhoto
                      : `http://localhost:5000/uploads/${gym.gymPhoto}`
                  }
                  alt={gym.name || "Gym facility"}
                  height={200}
                  className="w-full h-40 xs:h-48 sm:h-52 md:h-56 lg:h-64 object-cover rounded-lg transform  transition-transform duration-500"
                />
                {/* Gym Name Overlay */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}