import React from 'react'
import { Link } from "react-router-dom";

export default function JoinUs() {
    return (
      <section className="pt-20 overflow-hidden bg-gray-50 md:pt-0 sm:pt-16 2xl:pt-16">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Join Us and Start Your Journey with Us!  
              </h2>
              <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
                Whether you're a gym owner looking to expand your business or a nursery owner wanting to make your space more accessible, you've come to the right place. Join our platform to connect with your target audience and grow your business.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                {/* Button to open Gym Form */}
                  <Link to="/GymRegistrationForm"
                  className="px-6 py-3 text-lg font-semibold text-white bg-[#EC7FA9] hover:bg-[#FFD95F]   rounded-full transition-colors"
                  >
                  Register Your Gym
                  </Link>
                {/* Button to open Nursery Form */}
                <a
                  href="/nursery-form"
                  className="px-6 py-3 text-lg font-semibold text-white bg-[#8F87F1] hover:bg-[#FFD95F]  rounded-full transition-colors"
                >
                  Register Your Nursery
                </a>
              </div>
              <p className="mt-4 text-xl text-gray-600">
                Already ready to subscribe? Choose one of the available subscription plans and join us immediately!
              </p>
              {/* Subscription Button */}
              <a
                href="/subscription"
                className="mt-4 inline-block px-6 py-3 text-lg font-semibold text-white bg-[#3674B5] hover:bg-[#FFD95F] rounded-full transition-colors"
              >
                Subscribe Now
              </a>
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
