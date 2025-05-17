import React from 'react';
import { CgGym } from "react-icons/cg";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

export default function OurServices() {
  useEffect(() => {
    AOS.init({
      duration: 1000,  
      once: true,      
    });
  }, []);

  return (
    <div className='bg-[#f1f4fa]'>
      {/* Services Section */}
      <section id="services" className="services py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 
          className="text-center text-3xl sm:text-4xl font-bold text-[#9C2A46] mb-10 sm:mb-16"
          data-aos="fade-up"
        >
          Explore Our Services
        </h2>
        
        {/* Services Grid */}
        <div 
          className="container mx-auto px-0 sm:px-4"
          data-aos="fade-up" 
          data-aos-delay={500}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Service Item 1 */}
            <Link 
              to="/GymListingPage?category=Gym only" 
              className="group transform transition-transform duration-700 hover:-translate-y-2"
            >
              <div className="img overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/images/serv1.jpg" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Gym only service" 
                  loading="lazy"
                />
              </div>
              <div className="details relative bg-white p-6 sm:p-8 -mt-12 mx-4 sm:mx-6 rounded-lg shadow-md text-center transition-all duration-300 group-hover:shadow-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="icon w-14 h-14 sm:w-16 sm:h-16 bg-[#D3678A] text-white border-2 border-white rounded-full flex items-center justify-center text-2xl absolute top-[-28px] sm:top-[-30px] left-1/2 transform -translate-x-1/2 transition-all duration-400 group-hover:bg-white group-hover:text-[#D3678A] group-hover:border-[#D3678A]">
                  <CgGym className="text-2xl sm:text-3xl"/>
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-semibold text-[#9C2A46] group-hover:text-[#D3678A]">
                  Gym Only
                </h3>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm">
                  Find gyms that focus on fitness with state-of-the-art equipment and no distractions.
                </p>
              </div>
            </Link>
            
            {/* Service Item 2 */}
            <Link 
              to="/GymListingPage?category=Gym with indoor nursery" 
              className="group transform transition-transform duration-700 hover:-translate-y-2"
            >
              <div className="img overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/images/serv2.jpg" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Gym with nursery service" 
                  loading="lazy"
                />
              </div>
              <div className="details relative bg-white p-6 sm:p-8 -mt-12 mx-4 sm:mx-6 rounded-lg shadow-md text-center transition-all duration-300 group-hover:shadow-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="icon w-14 h-14 sm:w-16 sm:h-16 bg-[#D3678A] text-white border-2 border-white rounded-full flex items-center justify-center text-2xl absolute top-[-28px] sm:top-[-30px] left-1/2 transform -translate-x-1/2 transition-all duration-400 group-hover:bg-white group-hover:text-[#D3678A] group-hover:border-[#D3678A]">
                  <MdOutlineSportsGymnastics className="text-2xl sm:text-3xl"/>
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-semibold text-[#9C2A46] group-hover:text-[#D3678A]">
                  Gym with Indoor Nursery
                </h3>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm">
                  Enjoy your workouts while your kids are cared for in a safe, nearby environment.
                </p>
              </div>
            </Link>
            
            {/* Service Item 3 */}
            <Link 
              to="/NurseryListingPage" 
              className="group transform transition-transform duration-700 hover:-translate-y-2"
            >
              <div className="img overflow-hidden rounded-lg shadow-md">
                <img 
                  src="/images/serv3.jpg" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Gym with nearby nursery service" 
                  loading="lazy"
                />
              </div>
              <div className="details relative bg-white p-6 sm:p-8 -mt-12 mx-4 sm:mx-6 rounded-lg shadow-md text-center transition-all duration-300 group-hover:shadow-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="icon w-14 h-14 sm:w-16 sm:h-16 bg-[#D3678A] text-white border-2 border-white rounded-full flex items-center justify-center text-2xl absolute top-[-28px] sm:top-[-30px] left-1/2 transform -translate-x-1/2 transition-all duration-400 group-hover:bg-white group-hover:text-[#D3678A] group-hover:border-[#D3678A]">
                  <LuHeartHandshake className="text-2xl sm:text-3xl"/>
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-semibold text-[#9C2A46] group-hover:text-[#D3678A]">
                  Gym with Nearby Nursery
                </h3>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm">
                  Access gyms conveniently located near trusted nurseries for your peace of mind.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}