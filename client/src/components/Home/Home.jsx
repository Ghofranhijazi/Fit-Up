import React from 'react';
import OurServices from './OurServices.jsx';
import Trainers from './Trainers.jsx';
import BestGyms from './BestGyms.jsx';
import JoinUs from './JoinUs.jsx';
import FirstSection from './FirstSection.jsx';
import Footer from '../Footer/Footer.jsx';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet'; // ✅ Import Helmet

export default function Home() {
  return (
    <>
      {/* ✅ SEO Tags in English */}
      <Helmet>
        <title>Home | FitUp - Mama and Me</title>
        <meta
          name="description"
          content="FitUp is a platform designed for moms who want to stay active while keeping their little ones close. Explore gyms, nurseries, and fitness programs tailored for mothers."
        />
        <meta
          name="keywords"
          content="fitness, mothers, gyms, nurseries, active moms, workout with baby, FitUp"
        />
        <meta name="author" content="FitUp Team" />
        <meta property="og:title" content="Home | FitUp - Mama and Me" />
        <meta
          property="og:description"
          content="Discover FitUp, the perfect blend of fitness and childcare for modern mothers. Join our platform today!"
        />
      </Helmet>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full h-screen md:h-[80vh] lg:h-160 flex items-center max-h-full max-w-full justify-center text-white overflow-hidden"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source
            src="https://videos.pexels.com/video-files/5991826/5991826-sd_640_360_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div
          className="absolute inset-0"
          style={{ background: 'rgba(40, 36, 41, 0.7)' }}
        ></div>

        <div className="relative z-10 text-center w-full px-4 sm:px-6 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mt-7">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 animate-fade-up">
            Mama and Me with <span className="text-[#C0526F]" style={{ fontFamily: "'Dancing Script', sans-serif" }}>FitUp</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light mb-4 sm:mb-6 animate-fade-up delay-100 px-2 sm:px-0">
            A platform designed for mothers who want to stay active while keeping their little ones close.
            It provides an opportunity to move, strengthen muscles and recharge energy, giving you time for yourself while your baby stays by your side.
          </p>
          <div className="flex justify-center animate-fade-up delay-200">
            <Link
              to="/register"
              className="bg-[#C0526F] hover:bg-[#d1637f] text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-all text-sm sm:text-base"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <div className='w-full h-1 bg-[#C0526F]'></div>

      <FirstSection />
      <OurServices />
      <Trainers />
      <BestGyms />
      <JoinUs />
    </>
  );
}
