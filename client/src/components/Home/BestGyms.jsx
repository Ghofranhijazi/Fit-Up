import React from 'react';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";


export default function BestGyms() {
   useEffect(() => {
          AOS.init({
              duration: 1000,  
              once: true,      
          });
      }, []);
      
    return (
<div className='bg-[#f1f4fa]'>
<section className="py-10 sm:py-16 lg:py-24" data-aos="fade-up" data-aos-delay={500}>
  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
  <div className="max-w-3xl mx-auto text-center">
  <h2 className="text-center text-4xl font-bold text-[#9C2A46] mb-5">
    Discover the Best Gyms With Us
  </h2>
  <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
    Find the perfect gym to match your fitness goals. Whether you want to build strength, stay active, or improve your health, we’ve got you covered.
  </p>
</div>
    <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-3 md:mt-16 lg:gap-x-12">
      <div>
        <img
          className="w-full h-64 object-cover"
          src="https://img.freepik.com/free-photo/gym-with-indoor-cycling-equipment_23-2149270210.jpg?ga=GA1.1.2031020980.1734978984&semt=ais_hybrid&w=740"
          alt=""
        />
      </div>
      <div>
        <img
           className="w-full h-64 object-cover"
          src="https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114204.jpg?ga=GA1.1.2031020980.1734978984&semt=ais_hybrid&w=740"
          alt=""
        />
      </div>
      <div>
        <img
           className="w-full h-64 object-cover"
          src="https://img.freepik.com/free-photo/interior-equipment-modern-gym-close-up-view-suspension-straps-sport-fitness-health_613910-20264.jpg?ga=GA1.1.2031020980.1734978984&semt=ais_hybrid&w=740"
          alt=""
        />
      </div>
    </div>
    <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-3 md:mt-16 lg:gap-x-12">
      <div>
        <img
           className="w-full h-64 object-cover"
          src="https://img.freepik.com/free-photo/health-club-without-people-with-exercise-equipment_637285-8446.jpg?ga=GA1.1.2031020980.1734978984&semt=ais_hybrid&w=740"
          alt=""
        />
      </div>
      <div>
        <img
           className="w-full h-64 object-cover"
          src="https://img.freepik.com/premium-photo/hotel_664434-3668.jpg?ga=GA1.1.2031020980.1734978984&semt=ais_hybrid&w=740"
          alt=""
        />
      </div>
      <div>
        <img
           className="w-full h-64 object-cover"
          src="https://img.freepik.com/premium-photo/room-with-view-cityscape-bench-with-view-city_1209906-822.jpg?ga=GA1.1.2031020980.1734978984&semt=ais_hybrid&w=740"
          alt=""
        />
      </div>
    </div>

  </div>
</section>

</div>
    )
}