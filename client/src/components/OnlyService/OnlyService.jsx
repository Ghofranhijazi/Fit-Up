import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // لاستعمال أيقونات مخصصة للماركرات

export default function OnlyService() {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNursery, setShowNursery] = useState(false); // إظهار الحضانة
  const navigate = useNavigate(); // Initialize useNavigate


  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/gyms/${id}`);
        setGym(response.data.gym);
      } catch (error) {
        console.error("Error fetching gym details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGymDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!gym) return <div>No gym available</div>;

  // موقع الحضانة الافتراضي بالقرب من الجيم
  const nearestNursery = {
    lat: gym.location.lat + 0.002,
    lng: gym.location.lng + 0.002,
  };

  // أيقونة Marker مخصصة للجيم
  const gymIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/14034/14034747.png",
    iconSize: [35, 35], // حجم الأيقونة
  });

  // أيقونة Marker مخصصة للحضانة
  const nurseryIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/14034/14034740.png",
    iconSize: [35, 35], 
  });

  // دالة تُظهر Alert عند الضغط على زر "Nearest Nursery"
  const handleShowNursery = () => {
    alert(`The nearest nursery to ${gym.gymName} is now displayed on the map!`);
    setShowNursery(true);
  };

  // دالة الانتقال إلى صفحة الحجز مع إرسال البيانات
  const handleBookNow = () => {
    navigate(`/Booking/${id}`, {
      state: { gymName: gym.gymName, plans: gym.plans },
    });
  };

  return (
    <section className="py-10 mt-20 max-w-6xl mx-auto">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 order-1 lg:order-2">
            <img
              src={`http://localhost:5000/uploads/${gym.gymPhoto.replace("\\", "/")}`}
              className="w-full h-100 rounded-lg object-cover shadow-md"
              alt={gym.gymName}
            />

            {/* الأزرار تحت الصورة */}
            <div className="flex gap-4 mt-6">
              <button
                className="bg-[#C0526F] hover:bg-[#A04460] text-white px-6 py-3 rounded-full font-medium transition-colors"
                onClick={handleBookNow} 
              >
                Book now
              </button>
              <button
                className="bg-[#C0526F] hover:bg-[#A04460] text-white px-6 py-3 rounded-full font-medium transition-colors"
                onClick={handleShowNursery}
              >
                Nearest Nursery
              </button>
            </div>
          </div>

          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-gray-100 p-6 rounded shadow mb-8">
              <h3 className="text-2xl font-bold mb-4 text-[#C0526F]">Gym information</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex">
                  <span className="font-semibold min-w-[80px]">Name:</span>
                  <span>{gym.gymName}</span>
                </li>
                <li className="flex">
                  <span className="font-semibold min-w-[80px]">Address:</span>
                  <span>{gym.address}</span>
                </li>
                <li className="flex">
                  <span className="font-semibold min-w-[80px]">Opening hours:</span>
                  <span>{gym.openingHour} - {gym.closingHour}</span>
                </li>
                <li className="flex">
                  <span className="font-semibold min-w-[80px]">Price:</span>
                  <div className="flex flex-col">
                    {gym.plans?.map((p) => (
                      <span key={p.name}>{p.name}: {p.price} JOD</span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-4 text-[#C0526F]">{gym.gymName}</h2>
              <p className="text-gray-700 leading-relaxed">{gym.description}</p>
            </div>
          </div>
        </div>

        {/* خريطة الجيم والحضانة */}
        <div className="mt-10">
          <MapContainer center={gym.location} zoom={14} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* موقع الجيم */}
            <Marker position={gym.location} icon={gymIcon}>
              <Popup>{gym.gymName}</Popup>
            </Marker>

            {/* موقع الحضانة (يظهر عند الضغط على الزر) */}
            {showNursery && (
              <Marker position={nearestNursery} icon={nurseryIcon}>
                <Popup>Nearest Nursery</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
