import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NurseryListingPage() {
  const [nurseries, setNurseries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNurseries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nurseries/all');
        if (response.data && response.data.nurseries) {
          setNurseries(response.data.nurseries);
        } else {
          setError('No nurseries available');
        }
      } catch (error) {
        console.error('Error fetching nurseries:', error);
        setError('Failed to fetch nurseries');
      } finally {
        setLoading(false);
      }
    };

    fetchNurseries();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f0f7ff] to-[#e6f0fa]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8F87F1]"></div>
    </div>
  );
  
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-165 flex items-center justify-center text-white">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://img.freepik.com/free-photo/green-child-living-room-interior-with-copy-space_43614-882.jpg?t=st=1746254897~exp=1746258497~hmac=7413ce58a87ac0c1a1489513460c479b48413c9a939a9c51cab7009e6cfa56a1&w=996"
          alt="Discover the Best Nurseries With Us"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(40, 36, 41, 0.7)',
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-3xl px-6 mt-15">
          <h2 className="text-4xl text-[#8F87F1] md:text-5xl font-bold mb-4 animate-fade-up">
            Our Nurseries
          </h2>
          <span className="text-2xl font-bold">Safe, nurturing environments for your little ones</span>
          <div className="text-lg mt-2">
            Discover top-rated nurseries offering quality childcare, early education, and a loving atmosphere where children can grow and thrive.
          </div>
        </div>
      </section>
      <div className='w-full h-1 bg-[#8F87F1]'></div>

      {/* Nursery Cards Section */}
      <div className="max-w-screen-xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {nurseries && nurseries.length > 0 ? (
            nurseries.map((nursery) => (
              <Link to={`/NurseryDetailsPage/${nursery.id}`} key={nursery.id}>
                <div
                  className="relative overflow-hidden shadow-md group cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                  style={{ width: "400px", height: "500px", willChange: "transform" }}
                >
                  <img
                    src={nursery.nurseryPhoto ? `http://localhost:5000/uploads/${nursery.nurseryPhoto.replace("\\", "/")}` : 'fallback-image.jpg'}
                    loading="lazy"
                    decoding="async"
                    alt="Nursery"
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    style={{ willChange: "transform" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                    <h3 className="text-white text-3xl text-center font-bold transition duration-300 group-hover:scale-95">
                      {nursery.nurseryName || 'Nursery Name'}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No nurseries available</p> 
          )}
        </div>
      </div>
    </>
  );
}