import React from 'react'
import OurServices from'./OurServices.jsx'
import Trainers from'./Trainers.jsx'
import Membership from'./Membership.jsx'
import Footer from'../Footer/Footer.jsx'

  export default function Home() {
    return (
        <>
        {/* Hero Section */}
       
  <section id="hero" className="relative w-full h-190 flex items-center  justify-center text-white">
   {/* Background Video */}
   <video
   className="absolute inset-0 w-full h-full object-cover "
  autoPlay
  loop
  muted
  playsInline
>
  <source src="/videos/mp4.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

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
        <a href="#about" className="bg-[#C0526F] hover:bg-[#9C2A46] text-white font-bold py-3 px-6 rounded-lg transition-all">
          Get Started
        </a>
      </div>
    </div>
</section>

<OurServices/>
<Trainers/>
<Membership/>
        </>
    )
}