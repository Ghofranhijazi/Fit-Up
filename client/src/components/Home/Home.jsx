import React from 'react'
import OurServices from'./OurServices.jsx'
import Trainers from'./Trainers.jsx'
import BestGyms from'./BestGyms.jsx'
import JoinUs from'../JoinUs/JoinUs.jsx'
import Footer from'../Footer/Footer.jsx'
import { Link } from "react-router-dom";

  export default function Home() {

    
    return (
        <>
        {/* Hero Section */}
       
  <section id="hero" className="relative w-full h-180 flex items-center justify-center text-white">
   
   {/* Background Video */}
   {/* <video
   className="absolute inset-0 w-full h-full object-cover "
  autoPlay
  loop
  muted
  playsInline
>
  <source src="/videos/mp4.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video> */}
<img
  className="absolute inset-0 w-full h-full object-cover"
  src="https://static.spacecrafted.com/fc7241510ec245c5b42e95561258cdcc/i/d5e37c3e05f140dc8513b5a1cd0c382f/1/GCuCv726gZycFxatknDdac/5.png?dpr=2"
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
  <div className="relative z-10 text-center max-w-3xl px-6 mt-25">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up" >
      Mama and Me with <span className="text-[#C0526F]" style={{ fontFamily: "'Dancing Script', sans-serif"}}>FitUp</span>
      </h2>
      <p className="text-lg md:text-xl font-light mb-6 animate-fade-up delay-100">
      A platform designed for mothers who want to stay active while keeping their little ones close.
      It provides an opportunity to move, strengthen muscles and recharge energy, giving you time for yourself while your baby stays by your side.
      </p>
      <div className="flex justify-center animate-fade-up delay-200">
        <Link to ="/register" className="bg-[#C0526F] hover:bg-[#d1637f] text-white font-bold py-3 px-6 rounded-lg transition-all">
          Get Started
        </Link>
      </div>
    </div>
</section>
<div className='w-full h-1 bg-[#C0526F]'></div>

<OurServices/>
<Trainers/>
<BestGyms/>
<JoinUs/>
        </>
    )
}