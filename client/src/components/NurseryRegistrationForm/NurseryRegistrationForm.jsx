import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useSelector } from "react-redux";
import axios from "axios";

const NurseryRegistrationForm = () => {
  const reduxUser = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem("user"));

  const user_id = reduxUser?.id || localUser?.id;
  const email = reduxUser?.email || localUser?.email;

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedData, setSavedData] = useState({});

  const [formData, setFormData] = useState({
    nurseryName: "",
    email: email || "",
    phone: "",
    address: "",
    services: [],
    description: "",
    nurseryPhoto: null,
    openingHour: "",
    closingHour: "",
    location: "",
    capacity: "",
    minAge: "",
    maxAge: "",
    documents: [],
    coordinates: { lat: 31.963158, lng: 35.930359 },
  });

  const serviceOptions = [
    "Daycare",
    "Educational Activities",
    "Food Services",
    "Special Support for Children with Special Needs",
    "After School Care",
    "Weekend Programs"
  ];

  const documentOptions = [
    "Copy of license"
  ];

  // Load user-specific data
  useEffect(() => {
    if (!user_id) return;
  
    const saved = JSON.parse(localStorage.getItem(`userData-${user_id}`)) || {};
    setSavedData(saved);
    setFormData((prev) => ({
      ...prev,
      nurseryName: saved.nurseryName || prev.nurseryName,
      email: email || prev.email,
    }));
  }, [user_id, email]);

  const validateForm = () => {
    if (!formData.nurseryName) return "Nursery name is required";
    if (!formData.email) return "Email is required";
    if (!formData.phone) return "Phone number is required";
    if (!formData.address) return "Address is required";
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleServiceChange = (service) => {
    setFormData(prev => {
      if (prev.services.includes(service)) {
        return {
          ...prev,
          services: prev.services.filter(s => s !== service)
        };
      } else {
        return {
          ...prev,
          services: [...prev.services, service]
        };
      }
    });
  };

  const handleDocumentUpload = (e, docType) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [
        ...prev.documents,
        ...files.map(file => ({ type: docType, file }))
      ]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted"); // للتحقق إذا تم استدعاء الـ submit
    if (isSubmitting) return; // منع التكرار

    setIsSubmitting(true);

  
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }
  
    if (!user_id) {
      alert("You must be logged in to submit your request.");
      navigate("/login");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("user_id", user_id);
    formDataToSend.append("nurseryName", formData.nurseryName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("services", JSON.stringify(formData.services)); // تحويل الخدمات إلى JSON
    formDataToSend.append("additionalServices", formData.additionalServices || "");
    formDataToSend.append("description", formData.description);
    formDataToSend.append("openingHour", formData.openingHour);
    formDataToSend.append("closingHour", formData.closingHour);
    formDataToSend.append("location", JSON.stringify(formData.coordinates)); // تحويل الموقع إلى JSON
    formDataToSend.append("capacity", formData.capacity);
    formDataToSend.append("minAge", formData.minAge);
    formDataToSend.append("maxAge", formData.maxAge);
    formDataToSend.append("category", "nursery");

    
  
    // إضافة الصورة إلى FormData
    if (formData.nurseryPhoto) {
      formDataToSend.append("nurseryPhoto", formData.nurseryPhoto);
    }
  
    formData.documents.forEach((doc) => {
      formDataToSend.append("documents", doc.file);
    });
  
    try {
      const response = await axios.post("http://localhost:5000/api/nurseries/add-nursery", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response from server:", response.data); // ✅ للتأكد
      const nursery = response.data.nursery;
      if (nursery && nursery.id) {
        localStorage.setItem("nursery_id", nursery.id);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem(`userData-${user_id}`, JSON.stringify(formData));
        localStorage.removeItem("gym_id"); // ✅ إزالة gym_id في حال كان موجود
        alert("تم تسجيل الحضانة بنجاح!");
        navigate("/choose-plan");
      } else {
        alert("حدث خطأ: لم يتم استلام رقم الحضانة.");
      }
    } catch (error) {
      console.error("Error submitting nursery registration", error);
      alert("Failed to submit nursery registration.");
    } finally {
      setIsSubmitting(false); // إعادة التفعيل بعد انتهاء العملية
    }
  };
  

  const LocationMarker = ({ setCoordinates }) => {
    useMapEvents({
      click(e) {
        setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <div className="min-h-screen bg-white-to-b from-gray-900 to-black flex flex-col p-6 mt-12">
      <div className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="bg-white shadow-2xl rounded-lg w-full max-w-4xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#8F87F1] to-[#6A60E9] p-6 text-white">
            <h2 className="text-3xl font-bold">Nursery Registration</h2>
            <p className="mt-2 opacity-80">
              Fill in the details to register your nursery
            </p>
            {/* Progress Indicator */}
            <div className="mt-6 flex justify-between">
              <div className={`flex items-center ${step >= 1 ? "text-white" : "text-gray-300"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-white text-[#8F87F1]" : "bg-gray-600"
                } font-bold`}>
                  1
                </div>
                <span className="ml-2 hidden sm:inline">Basic Info</span>
              </div>
              <div className="flex-grow mx-2 mt-4">
                <div className="h-1 bg-gray-600">
                  <div className={`h-1 bg-white transition-all duration-500`} 
                    style={{ width: `${(step - 1) * 50}%` }}></div>
                </div>
              </div>
              <div className={`flex items-center ${step >= 2 ? "text-white" : "text-gray-300"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-white text-[#8F87F1]" : "bg-gray-600"
                } font-bold`}>
                  2
                </div>
                <span className="ml-2 hidden sm:inline">Detailed Info</span>
              </div>
              <div className="flex-grow mx-2 mt-4">
                <div className="h-1 bg-gray-600">
                  <div className={`h-1 bg-white transition-all duration-500`} 
                    style={{ width: `${(step - 2) * 100}%` }}></div>
                </div>
              </div>
              <div className={`flex items-center ${step >= 3 ? "text-white" : "text-gray-300"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-white text-[#8F87F1]" : "bg-gray-600"
                } font-bold`}>
                  3
                </div>
                <span className="ml-2 hidden sm:inline">Location Map</span>
              </div>
            </div>
          </div>
  
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {step === 1 && (
              <div className="space-y-6 animate__animated animate__fadeIn">
                <input
                  type="text"
                  name="nurseryName"
                  placeholder="Nursery Name *"
                  value={formData.nurseryName}
                  onChange={handleChange}
                  readOnly={!!savedData.nurseryName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                  required
                />
                <textarea
                  name="address"
                  placeholder="Address *"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                  required
                ></textarea>
                
                <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Types of Services Provided *
  </label>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
    {serviceOptions.map(service => (
      <label key={service} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.services.includes(service)}
          onChange={() => handleServiceChange(service)}
          className="rounded text-[#8F87F1] focus:ring-[#8F87F1]/50"
        />
        <span>{service}</span>
      </label>
    ))}
  </div>
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Additional Services (if not listed above)
    </label>
    <input
      type="text"
      placeholder="Enter other services you provide"
      value={formData.additionalServices || ""}
      onChange={(e) => setFormData(prev => ({
        ...prev,
        additionalServices: e.target.value
      }))}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
    />
  </div>
</div>

                <textarea
                  name="description"
                  placeholder="Nursery Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                ></textarea>
                
                <label className="block text-sm font-medium text-gray-700">
                  Photo Of Nursery *:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nurseryPhoto: e.target.files[0] }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="py-3 px-8 bg-[#8F87F1] hover:bg-[#6A60E9] text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center"
                  >
                    Next Step <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )}
  
            {step === 2 && (
              <div className="space-y-6 animate__animated animate__fadeIn">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Operating Hours *:
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="time"
                      name="openingHour"
                      value={formData.openingHour}
                      onChange={handleChange}
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                      required
                    />
                    <input
                      type="time"
                      name="closingHour"
                      value={formData.closingHour}
                      onChange={handleChange}
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Number of children who can be accommodated *
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      placeholder="Enter number"
                      value={formData.capacity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Minimum age accepted *
                      </label>
                      <input
                        type="number"
                        name="minAge"
                        placeholder="Minimum age"
                        value={formData.minAge}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Maximum age accepted *
                      </label>
                      <input
                        type="number"
                        name="maxAge"
                        placeholder="Maximum age"
                        value={formData.maxAge}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8F87F1] focus:border-[#8F87F1]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Documents to be attached to the application *
                  </label>
                  <div className="space-y-4">
                    {documentOptions.map(docType => (
                      <div key={docType} className="space-y-1">
                        <label className="text-sm text-gray-600">{docType}</label>
                        <input
                          type="file"
                          onChange={(e) => handleDocumentUpload(e, docType)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                          multiple
                        />
                      </div>
                    ))}
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Attached documents:</p>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {formData.documents.map((doc, index) => (
                          <li key={index}>{doc.type}: {doc.file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
  
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-8 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center"
                  >
                    <span className="mr-2">←</span> Previous
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="py-3 px-8 bg-[#8F87F1] hover:bg-[#6A60E9] text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center"
                  >
                    Next Step <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )}
  
            {step === 3 && (
              <div className="space-y-6 animate__animated animate__fadeIn">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Location on the Map:
                  </label>
                  <MapContainer
                    center={[formData.coordinates.lat, formData.coordinates.lng]}
                    zoom={13}
                    style={{ height: "300px", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[formData.coordinates.lat, formData.coordinates.lng]}>
                      <Popup>Your Nursery Location</Popup>
                    </Marker>
                    <LocationMarker
                      setCoordinates={(coords) =>
                        setFormData((prev) => ({
                          ...prev,
                          coordinates: coords,
                        }))
                      }
                    />
                  </MapContainer>
                </div>
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="py-3 px-8 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center"
                  >
                    <span className="mr-2">←</span> Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`py-3 px-8 bg-[#8F87F1] hover:bg-[#6A60E9] text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    {!isSubmitting && <span className="ml-2">→</span>}
                  </button>
                </div>
              </div>
            )}
          </form>
  
          {/* Form Footer */}
          <div className="bg-gray-100 p-4 border-t border-gray-300 text-sm text-gray-600">
            <p>
              By submitting this form, you confirm that all information provided
              is accurate and complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseryRegistrationForm;