import React from 'react'
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export default function JoinUs() {
  useEffect(() => {
      AOS.init({
          duration: 1000,  
          once: true,      
      });
  }, []);
  
    return (
      <section className="pt-15 overflow-hidden bg-white md:pt-0 sm:pt-16 2xl:pt-16" data-aos="fade-up" data-aos-delay={500}>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-[#9C2A46] sm:text-4xl lg:text-5xl">
                Join Us and Start Your Journey with Us!  
              </h2>
              <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
                Whether you're a gym owner looking to expand your business or a nursery owner wanting to make your space more accessible, you've come to the right place. Join our platform to connect with your target audience and grow your business.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
                {/* Button to open Gym Form */}
                  <Link to="/GymRegistrationForm"
                  className="px-6 py-3 text-lg font-semibold text-white bg-[#C0526F] hover:bg-[#d1637f] rounded-full transition-colors"
                  >
                  Register Your Gym
                  </Link>
                {/* Button to open Nursery Form */}
                 <Link to="/NurseryRegistrationForm"
                  className="px-6 py-3 text-lg font-semibold text-white bg-[#8F87F1] hover:bg-[#B1A7F4] rounded-full transition-colors"
                >
                  Register Your Nursery
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg"
                alt="Decorative Background"
              />
              <img
                className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-130"
                src="/images/ww.png"
                alt="Join Us"
              />
            </div>
          </div>
        </div>
      </section>
    )
}