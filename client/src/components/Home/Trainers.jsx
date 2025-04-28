import React from 'react';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";



export default function Trainers() {

  useEffect(() => {
            AOS.init({
                duration: 1000,  
                once: true,      
            });
        }, []);
        
    return (
<div className='bg-white'>
  {/* Services Section */}
<section id="services" className="services py-14 ml-8 mr-8">
  {/* Section Title */}
  <div className="container mx-auto text-left mb-12 flex items-center ml-8">
  {/* <h2 className="text-xl font-light text-gray-600 mr-4">TRAINERS</h2>
  <div className="h-px bg-[#D3678A] w-40"></div> */}
</div>
<h2 className="text-center text-4xl font-bold text-[#9C2A46] mb-16">
    MEET OUR BEST TRAINERS
  </h2>

  <div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
    {[
      { name: "Coach Dana Al-Majali", gym: "Active Her Studio", img: "https://img.freepik.com/free-photo/portrait-serious-woman-black-shirt-posing-white-background-high-quality-photo_114579-61015.jpg?uid=R181373975&ga=GA1.1.1709772547.1733645509&semt=ais_hybrid" },
      { name: "Coach Rana Al-Tamimi", gym: "Empower Gym", img: "https://img.freepik.com/free-photo/blonde-lady-black-t-shirt-standing-with-crossed-arms-looking-cheery-front-view_176474-34804.jpg?uid=R181373975&ga=GA1.1.1709772547.1733645509&semt=ais_hybrid" },
      { name: "Coach Laila Al-Khatib", gym: "ZenFit Lounge", img: "https://img.freepik.com/free-photo/young-fitness-girl-black-sportswear-with-headband-smiling-with-crossed-hands-standing-white-wall_141793-56826.jpg?uid=R181373975&ga=GA1.1.1709772547.1733645509&semt=ais_hybrid" },
      { name: "Coach Maya Al-Jarrah", gym: "Empower Gym", img: "https://img.freepik.com/free-photo/young-fitness-girl-wearing-headband-looking-camera-smiling-confident-with-arms-crossed-standing-white-background_141793-118472.jpg?uid=R181373975&ga=GA1.1.1709772547.1733645509&semt=ais_hybrid" },
      { name: "Coach Noura Al-Omari", gym: "ZenFit Lounge", img: "https://img.freepik.com/free-photo/portrait-woman-ready-duty_23-2149222740.jpg?uid=R181373975&ga=GA1.1.1709772547.1733645509&semt=ais_hybrid" },
      { name: "Coach Saja Al-Rawashdeh", gym: "Her Haven Fitness", img: "https://img.freepik.com/free-photo/expressive-young-woman-posing-studio_176474-29498.jpg?uid=R181373975&ga=GA1.1.1709772547.1733645509&semt=ais_hybrid" },
    ].map((trainer, index) => (
      <div
        key={index}
       className="relative bg-white rounded-lg shadow-lg mb-12"
        data-aos="fade-up"
        data-aos-delay={500}
      >
        {/* Image */}
        <div className="relative rounded-lg overflow-hidden bg-gray-200">
          <img
            src={trainer.img}
            alt={trainer.name}
            className="w-full h-[280px] object-cover"
          />
        </div>

        {/* Member Info */}
        <div className="absolute bottom-0 left-0 right-0">
        <div className="absolute bottom-[-50px] left-5 right-5 bg-white bg-opacity-80 backdrop-blur-md text-gray-800 shadow-md p-5 rounded-lg ">
            <h3 className="text-[#9C2A46] text-xl font-medium pb-2 border-b border-gray-200 mb-2">{trainer.name}</h3>
            <div className="flex justify-between items-center">
            <a href='#'className="text-gray-600 italic hover:text-[#D3678A]">{trainer.gym}</a> 
              <div className="text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</section>
</div>
    )
}



