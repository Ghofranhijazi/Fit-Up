import React from 'react'
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";



export default function About() {

    useEffect(() => {
        AOS.init({
            duration: 1000,  
            once: true,      
        });
    }, []);

    return (
        <> 
         {/* Hero Section */}
       
  <section id="hero" className="relative w-full h-130 flex items-center  justify-center text-white">
   {/* Background Video */}
   <img
  className="absolute inset-0 w-full h-full object-cover grayscale filter"
  src="https://img.freepik.com/free-photo/sports-dumbbells-filtered-image-processed-vintage-effect_1232-3417.jpg?uid=R181373975&ga=GA1.1.1709772547.1733645509&semt=ais_hybrid"
  alt="Background"
/>


        {/* Overlay with Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(40, 36, 41, 0.8)',
          }}
        ></div>

  {/* Hero Content */}
  <div className="relative z-10 text-center max-w-3xl px-6 mt-25">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up" >
       <span className="text-[#C0526F]" style={{ fontFamily: "'Dancing Script', sans-serif"}}>About Us</span>
      </h2>
      <p className="text-lg md:text-xl font-light mb-6 animate-fade-up delay-100">
      To become the first platform that enables women to achieve their fitness goals easily while ensuring the safe care of their children.
      </p>
    </div>
</section>

    <div className="w-full max-w-6xl mx-auto px-4 py-16" data-aos="fade-up" data-aos-delay={500}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left side - Images */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative">
            {/* Circular text logo */}
            <div className="absolute top-0 right-0 z-10 w-24 h-24 md:w-32 md:h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="curve" fill="transparent" d="M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0" />
                <text fill="#000">
                  <textPath href="#curve">comprehensive childcare solutions.</textPath>
                </text>
              </svg>
            </div>
            
            {/* Images grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://img.freepik.com/free-photo/black-white-minimal-portrait_23-2149152595.jpg?uid=R181373975&ga=GA1.1.1709772547.1733645509&semt=ais_hybrid" 
                  alt="People collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Right image with play button */}
              <div className="bg-gray-100 rounded-lg overflow-hidden relative">
                <img 
                  src="https://img.freepik.com/free-photo/young-beautiful-mother-with-her-small-child-practicing-breast-feeding_1303-20309.jpg?uid=R181373975&ga=GA1.1.1709772547.1733645509&semt=ais_hybrid" 
                  alt="Person working remotely" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Text content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Take care of your children whether inside or near the gym.
          </h1>
          
          <div className="space-y-4 text-gray-600">
            <p>
            At  <span className="text-[#C0526F]" style={{ fontFamily: "'Dancing Script', sans-serif"}}>FitUp</span> we believe that every woman deserves a complete fitness experience without worrying about taking care of her children.
            </p>
            <p>
            Our goal is to provide an innovative service that combines comfort and quality to save you time and effort, while ensuring the highest levels of evaluation and credibility.
            </p>
          </div>
          
          <div className="pt-4">
            <button className="bg-[#C0526F] hover:bg-[#9C2A46] text-white px-6 py-3 rounded-lg flex items-center transition-colors">
            Read our article now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  
   
    <section className="py-10 bg-[#f1f4fa] sm:py-16 lg:py-24" data-aos="fade-up" data-aos-delay={500}>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">We work to achieve the following goals:</h2>
                </div>

                <div className="relative mt-12 lg:mt-20">
                    <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                        <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                    </div>

                    <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 1 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Providing convenient solutions</h3>
                            <p className="mt-4 text-base text-gray-600">Connecting women to the nearest gyms that offer nursery services.</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 2 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Quality assurance</h3>
                            <p className="mt-4 text-base text-gray-600">Showcasing highly rated gyms and nurseries that suit all needs.</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 3 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Simplifying the experience:</h3>
                            <p className="mt-4 text-base text-gray-600">Providing quick and direct booking that saves time and effort.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
 

        <section className="py-12 bg-white sm:py-16 lg:py-20" data-aos="fade-up" data-aos-delay={500}>
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">Our Investors & Board of Directors</h2>
        </div>

        <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-4 gap-y-12 lg:gap-x-16 xl:gap-x-20"> 
    <div>
        <img className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" 
            src="https://img.freepik.com/free-photo/happy-successful-muslim-businesswoman-posing-outside_74855-2007.jpg" alt=""/>
        <p className="mt-5 text-lg font-bold text-[#C0526F] sm:text-xl sm:mt-8 font-pj" 
            style={{ fontFamily: "'Dancing Script', sans-serif"}}>Lynn Al-Hijjawi</p>
        <p className="mt-2 text-base font-normal text-gray-600 font-pj">CEO of Family Fitness Gym</p>
    </div>

    <div>
        <img className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" 
            src="https://img.freepik.com/free-photo/happy-arab-woman-hijab-portrait-smiling-girl-posing-red-studio-background_155003-18008.jpg" alt=""/>
        <p className="mt-5 text-lg font-bold text-[#C0526F] sm:text-xl sm:mt-8 font-pj" 
            style={{ fontFamily: "'Dancing Script', sans-serif"}}>Dima Al-Kilani</p>
        <p className="mt-2 text-base font-normal text-gray-600 font-pj">Fitness Trainer & Moms' Workout Specialist</p>
    </div>

    <div>
        <img className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" 
            src="https://img.freepik.com/free-photo/lovely-woman-wearing-glasses_23-2148262835.jpg" alt=""/>
        <p className="mt-5 text-lg font-bold text-[#C0526F] sm:text-xl sm:mt-8 font-pj" 
            style={{ fontFamily: "'Dancing Script', sans-serif"}}>Noor Al-Khateeb</p>
        <p className="mt-2 text-base font-normal text-gray-600 font-pj">Nutritionist & Women's Health Specialist</p>
    </div>

    <div>
        <img className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" 
            src="https://img.freepik.com/free-photo/young-smiling-woman-red-warm-sweater-standing-with-headphones_114579-65806.jpg" alt=""/>
        <p className="mt-5 text-lg font-bold text-[#C0526F] sm:text-xl sm:mt-8 font-pj" 
            style={{ fontFamily: "'Dancing Script', sans-serif"}}>Yasmeen Al-Zoubi</p>
        <p className="mt-2 text-base font-normal text-gray-600 font-pj">Childcare Center Manager at the Gym</p>
    </div>
</div>

    </div>
</section>
      </>
      

    )
}
