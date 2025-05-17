import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

export default function FirstSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  
  return (
    <section className="flex justify-center bg-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-y-6 md:gap-x-8 lg:gap-x-12">
        {/* Left side - Text content */}
        <div className="text-center md:text-left md:pr-0 lg:pr-4 order-2 md:order-1">
          <h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-[#9C2A46] leading-tight"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            Active <br className="hidden xs:block" /> Motherhood, <br className="hidden xs:block" /> Together
          </h1>
          <p 
            className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 max-w-md mx-auto md:mx-0 md:max-w-sm lg:max-w-md"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <strong>Discover the fun!</strong> Dive in and explore workouts, mom-friendly activities, and a supportive community.
          </p>
          <div 
            className="mt-4 sm:mt-6 flex justify-center md:justify-start items-center gap-2 animate-bounce"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <span className="text-[#9C2A46] font-medium text-sm sm:text-base">See what's inside</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#9C2A46] animate-pulse"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Right side - Image */}
        <div 
          className="flex justify-center md:justify-end order-1 md:order-2"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <img
            src="/images/ChatGPT Image 17 مايو 2025، 07_52_34 م.png"
            alt="Active Mother Running with Stroller"
            className="w-full max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}