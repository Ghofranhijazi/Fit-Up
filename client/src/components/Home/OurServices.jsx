import React from 'react';
import { CgGym } from "react-icons/cg";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
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
<section id="services" className="services py-14 ml-8 mr-8">
  {/* Section Title */}
  <div className="container mx-auto text-left mb-12 flex items-center ml-8">
  <h2 className="text-2m font-light text-gray-500 mr-4">OUR SERVICES</h2>
  <div className="h-px bg-[#D3678A] w-40"></div>
</div>
  {/* End Section Title */}
  <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay={500}>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Service Item 1 */}
      <div>
        <div className="img overflow-hidden rounded-lg">
          <img src="/images/serv1.jpg" className="w-full h-70 object-cover transition-transform duration-500 hover:scale-110" alt="" />
        </div>
        <div className="details relative bg-white p-8 -mt-16 mx-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <div className="icon w-16 h-16 bg-[#D3678A] text-white border-2 border-white rounded-full flex items-center justify-center text-2xl absolute top-[-30px] left-1/2 transform -translate-x-1/2 transition-all duration-400 hover:bg-white hover:text-[#D3678A] hover:border-[#D3678A]">
          <CgGym style={{ fontSize: "35px" }}/>
          
          </div>
          <a href="gym-only-page.html" className="block mt-4 text-xl font-semibold text-[#9C2A46] hover:text-[#D3678A]">
            Gym Only
          </a>
          <p className="text-gray-600 mt-2 text-sm">
            Find gyms that focus on fitness with state-of-the-art equipment and no distractions.
          </p>
        </div>
      </div>
      
      {/* Service Item 2 */}
      <div>
        <div className="img overflow-hidden rounded-lg">
          <img src="/images/serv2.jpg" className="w-full h-70 object-cover transition-transform duration-500 hover:scale-110" alt="" />
        </div>
        <div className="details relative bg-white p-8 -mt-16 mx-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <div className="icon w-16 h-16 bg-[#D3678A] text-white border-2 border-white rounded-full flex items-center justify-center text-2xl absolute top-[-30px] left-1/2 transform -translate-x-1/2 transition-all duration-400 hover:bg-white hover:text-[#D3678A] hover:border-[#D3678A]">
          <MdOutlineSportsGymnastics style={{ fontSize: "35px" }}/>
          </div>
          <a href="Gym-indoor-nursery-page.html" className="block mt-4 text-xl font-semibold text-[#9C2A46] hover:text-[#D3678A]">
            Gym with Indoor Nursery
          </a>
          <p className="text-gray-600 mt-2 text-sm">
            Enjoy your workouts while your kids are cared for in a safe, nearby environment.
          </p>
        </div>
      </div>
      
      {/* Service Item 3 */}
      <div>
        <div className="img overflow-hidden rounded-lg">
          <img src="/images/serv3.jpg" className="w-full h-70 object-cover transition-transform duration-500 hover:scale-110" alt="" />
        </div>
        <div className="details relative bg-white p-8 -mt-16 mx-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <div className="icon w-16 h-16 bg-[#D3678A] text-white border-2 border-white rounded-full flex items-center justify-center text-2xl absolute top-[-30px] left-1/2 transform -translate-x-1/2 transition-all duration-400 hover:bg-white hover:text-[#D3678A] hover:border-[#D3678A]">
          <LuHeartHandshake style={{ fontSize: "35px" }}/>
          </div>
          <a href="Gym-nearby-nursery-page.html" className="block mt-4 text-xl font-semibold text-[#9C2A46] hover:text-[#D3678A]">
            Gym with Nearby Nursery
          </a>
          <p className="text-gray-600 mt-2 text-sm">
            Access gyms conveniently located near trusted nurseries for your peace of mind.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
</div>
    )
}



