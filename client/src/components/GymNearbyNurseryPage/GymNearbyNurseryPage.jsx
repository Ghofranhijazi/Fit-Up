import React from 'react'

export default function GymIndoorNurseryPage() {
    return (
        <>
        {/* Hero Section */}
       
  <section id="hero" className="relative w-full h-183 flex items-center  justify-center text-white">
   {/* Background Video */}
   <img
  className="absolute inset-0 w-full h-full object-cover grayscale filter"
  src="https://img.freepik.com/free-photo/children-kindergarten-with-developing-toys_23-2147663756.jpg?ga=GA1.1.2031020980.1734978984&semt=ais_hybrid"
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
       <span className="text-[#C0526F]" style={{ fontFamily: "'Dancing Script', sans-serif"}}>Nursery</span>
      </h2>
      <p className="text-lg md:text-xl font-light mb-6 animate-fade-up delay-100">
      Access gyms conveniently located near trusted nurseries for your peace of mind.
      </p>
    </div>
</section>



<div className="max-w-screen-xl mx-auto my-8">
    <div className="mx-8">
        <div className="flex items-center justify-center mt-4 mb-8">
            <h1 className="text-black text-4xl font-bold">Our Nursery</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div className="w-dyn-list">
                <div role="list" className="collection-list-17 w-dyn-items">
                    <div role="listitem" className="w-dyn-item">
                        <div className="relative  overflow-hidden shadow-lg w-96 h-88">
                            <div className="w-full h-full relative">
                                <img
                                    src="https://img.freepik.com/free-photo/teacher-preschool-students-playing-with-balls-sitting-floor-kindergarten_839833-22801.jpg?ga=GA1.1.2031020980.1734978984&semt=ais_hybrid"
                                    loading="lazy"
                                    alt="nothing"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="bg-[#6624805e] p-5 absolute inset-0 flex flex-col justify-between transition-colors duration-300 ease-in-out hover:bg-[#300a3e5e]">
                                <div className="text-center">
                                    <div className="text-white font-bold text-lg text-shadow-md">Nursery Name</div>
                                    <div className="text-white text-sm text-shadow-md text-right mr-2"></div>
                                </div>
                                <div className="text-center absolute inset-x-0 bottom-5">
                                    <button className="bg-[#9C2A46] rounded-lg py-2 px-6 text-white text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-[#2980b9]">
                                        More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        
        
        
        </>
    )
}