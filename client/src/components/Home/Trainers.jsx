import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

export default function Trainers() {
  const [topGyms, setTopGyms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchTopGyms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gyms/top-rated-gyms'); 
        setTopGyms(res.data);
      } catch (error) {
        console.error('Error fetching top gyms:', error);
      }
    };

    fetchTopGyms();
  }, []);

  return (
    <div className="bg-white">
      <section id="trainers" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className="text-3xl sm:text-4xl font-bold text-[#9C2A46] mb-4 sm:mb-5"
            data-aos="fade-up"
          >
            MEET OUR BEST TRAINERS
          </h2>
          <p 
            className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-600"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            These Are the Professionals Who Turn Goals Into Achievements
          </p>
        </div>

        <div 
          className="container mx-auto px-0 sm:px-4 mt-6 sm:mt-8 lg:mt-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topGyms
              .flatMap(gym =>
                gym.trainers?.map(trainer => ({ ...trainer, gymName: gym.name, gymId: gym.id }))
              )
              .slice(0, 6)
              .map((trainer, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-16 sm:mb-20"
                  data-aos="fade-up"
                  data-aos-delay={300 + (index * 100)}
                >
                  {/* Trainer Image */}
                  <div className="relative rounded-lg overflow-hidden bg-gray-200 h-48 sm:h-56 md:h-64 lg:h-72">
                    <img
                      src={`http://localhost:5000/uploads/${trainer.photo}`}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Trainer Info */}
                  <div className="absolute -bottom-12 sm:-bottom-14 left-4 right-4">
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 shadow-md p-4 sm:p-5 rounded-lg hover:bg-opacity-100 transition-all duration-300">
                      <h3 className="text-[#9C2A46] text-lg sm:text-xl font-medium pb-2 border-b border-gray-200 mb-2">
                        {trainer.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <button
                          className="text-gray-600 italic hover:text-[#D3678A] text-sm sm:text-base text-left"
                          onClick={() => navigate(`/gym-details/${trainer.gymId}`)}
                        >
                          {trainer.gymName}
                        </button>
                        <div className="text-yellow-400 text-sm sm:text-base">★★★★★</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}