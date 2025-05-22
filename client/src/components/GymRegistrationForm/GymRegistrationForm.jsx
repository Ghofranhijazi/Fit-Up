import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GymRegistrationForm = () => {
  const reduxUser = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem("user"));

  const user_id = reduxUser?.id || localUser?.id;
  const email = reduxUser?.email || localUser?.email;

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({ name: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [savedData, setSavedData] = useState({});


  const [formData, setFormData] = useState({
    gymName: "" ,
    email: email || "",
    phone: "",
    address: "",
    hasIndoorNursery: false,
    description: "",
    services: [],
    additionalServices: "",
    gymPhoto: null,
    openingHour: "",
    closingHour: "",
    location: "",
    plans: [],
    price: "",
    trainers: [{ name: "", experience: "", photo: "" }],
    coordinates: { lat: 31.963158, lng: 35.930359 },
  });

  const serviceOptions = [
  "Personal Training",
  "Group Classes",
  "Cardio Equipment",
  "Strength Training",
  "Swimming Pool",
  "Yoga/Pilates",
];

 
  useEffect(() => {
    if (!user_id) return;

  const savedForm = localStorage.getItem(`gymForm-${user_id}`);
  const parsedForm = savedForm ? JSON.parse(savedForm) : null;
  
    const saved = JSON.parse(localStorage.getItem(`userData-${user_id}`)) || {};
    const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));
  
   if (parsedForm) {
    setFormData((prev) => ({
      ...prev,
      ...parsedForm,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      gymName: saved.gymName || prev.gymName || "",
      email: email || prev.email,
      planName: selectedPlan?.name || prev.planName,
      price: selectedPlan?.price || prev.price,
    }));
  }

  setSavedData(saved);
}, [user_id, email]);

useEffect(() => {
  if (user_id) {
    localStorage.setItem(`gymForm-${user_id}`, JSON.stringify(formData));
  }
}, [formData, user_id]);

  const validateForm = () => {
    if (!formData.gymName) return "Gym name is required";
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

  const handleTrainerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTrainers = [...formData.trainers];
    updatedTrainers[index][name] = value;
    setFormData((prev) => ({ ...prev, trainers: updatedTrainers }));
  };

  const handleTrainerPhotoChange = (index, e) => {
    const updatedTrainers = [...formData.trainers];
    updatedTrainers[index].photo = e.target.files[0];
    setFormData((prev) => ({ ...prev, trainers: updatedTrainers }));
  };

  const addTrainer = () => {
    setFormData((prev) => ({
      ...prev,
      trainers: [...prev.trainers, { name: "", experience: "", photo: "" }],
    }));
  };

  const addPlan = () => {
    if (currentPlan.name && currentPlan.price) {
      setFormData((prev) => ({
        ...prev,
        plans: [...prev.plans, currentPlan],
      }));
      setCurrentPlan({ name: "", price: "" });
    }
  };

  const editPlan = (index) => {
    setCurrentPlan(formData.plans[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const saveEditedPlan = () => {
    const updatedPlans = formData.plans.map((plan, index) =>
      index === editIndex ? currentPlan : plan
    );
    setFormData((prev) => ({ ...prev, plans: updatedPlans }));
    setCurrentPlan({ name: "", price: "" });
    setIsEditing(false);
    setEditIndex(null);
  };

  const deletePlan = (index) => {
    const updatedPlans = formData.plans.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, plans: updatedPlans }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    if (isSubmitting) return; 
  setIsSubmitting(true); 

  const validationError = validateForm();
  if (validationError) {
    toast.error(validationError);
    setIsSubmitting(false);
    return;
  }

  if (!user_id) {
    toast.error("You must be logged in to submit your request.");
    navigate("/login");
    setIsSubmitting(false); 
    return;
  }

    
    if (!formData.gymName || !formData.phone || !formData.address || !formData.coordinates) {
     toast.error("Please fill in all required fields.");
    return;
  }
  
    const form = new FormData();
  
    // Append all form data
    form.append("user_id", user_id);
    form.append("gymName", formData.gymName || "");
    form.append("email", formData.email || "");
    form.append("phone", formData.phone || "");
    form.append("address", formData.address || "");
    form.append("hasIndoorNursery", formData.hasIndoorNursery);
    form.append("description", formData.description);
    form.append("services", JSON.stringify(formData.services || [])); 
    form.append("additionalServices", formData.additionalServices || ""); 
    form.append("openingHour", formData.openingHour);
    form.append("closingHour", formData.closingHour);
    form.append("location", JSON.stringify(formData.coordinates || {}));
    form.append("plans", JSON.stringify(formData.plans || []));
    form.append("trainers", JSON.stringify(formData.trainers.map((t) => ({
      name: t.name,
      experience: t.experience,
      photo: t.photo?.name || ""
    }))));
  
    if (formData.gymPhoto) {
      form.append("gymPhoto", formData.gymPhoto);
    }
  
    formData.trainers.forEach((trainer) => {
      if (trainer.photo instanceof File) {
        form.append("trainerPhotos", trainer.photo);
      }
    });
  
    try {
      const response = await axios.post("http://localhost:5000/api/gyms/add-gym", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      const gymId = response.data.gym?.id; 
      if (gymId) {
        localStorage.setItem("gym_id", gymId); 
        localStorage.setItem("user_id", user_id); 
        localStorage.removeItem("nursery_id");
        localStorage.removeItem(`gymForm-${user_id}`);
      }
    
      // toast.success("Gym submitted successfully!");
      navigate("/choose-plan");
    } catch (error) {
  console.error("Submission error:", error);


  const backendMessage = error?.response?.data?.message;

  if (backendMessage) {
    toast.error(backendMessage);
  } else {
    toast.error("Something went wrong during submission");
  }
}
    finally {
      setIsSubmitting(false); 
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
    <div className="min-h-screen bg-white-to-b from-gray-900 to-black flex flex-col px-4 sm:px-6 md:px-8 mt-12">
  <div className="flex-grow flex items-center justify-center py-4">
    <div className="bg-white shadow-2xl rounded-lg w-full max-w-4xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#C0526F] to-[#A04460] p-4 sm:p-6 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold">Gym Registration</h2>
        <p className="mt-2 opacity-80 text-sm sm:text-base">
          Fill in the details to register your gym
        </p>
       {/* Progress Indicator */}
            <div className="mt-6 flex justify-between">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-white" : "text-gray-300"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-white text-[#C0526F]" : "bg-gray-600"
                  } font-bold`}
                >
                  1
                </div>
                <span className="ml-2 hidden sm:inline">Basic Info</span>
              </div>
              <div className="flex-grow mx-2 mt-4">
                <div className="h-1 bg-gray-600">
                  <div
                    className="h-1 bg-white transition-all duration-500"
                    style={{ width: `${(step - 1) * 50}% `}}
                  ></div>
                </div>
              </div>
              <div
                className={`flex items-center ${
                  step >= 2 ? "text-white" : "text-gray-300"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-white text-[#C0526F]" : "bg-gray-600"
                  } font-bold`}
                >
                  2
                </div>
                <span className="ml-2 hidden sm:inline">Detailed Info</span>
              </div>
              <div className="flex-grow mx-2 mt-4">
                <div className="h-1 bg-gray-600">
                  <div
                     className="h-1 bg-white transition-all duration-500"
                     style={{ width: `${(step - 1) * 50}% `}}
                  ></div>
                </div>
              </div>
              <div
                className={`flex items-center ${
                  step >= 3 ? "text-white" : "text-gray-300"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-white text-[#C0526F]" : "bg-gray-600"
                  } font-bold`}
                >
                  3
                </div>
                <span className="ml-2 hidden sm:inline">Location Map</span>
              </div>
            </div>
          </div>
  
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
            {step === 1 && (
              <div className="space-y-6 animate_animated animate_fadeIn">
                <input
                  type="text"
                  name="gymName"
                  placeholder="Gym Name *"
                  value={formData.gymName}
                  onChange={handleChange}
                  readOnly={!!savedData.gymName} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={ email } 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
                  required
                />
                <textarea
                  name="address"
                  placeholder="Address *"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
                  required
                ></textarea>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="hasIndoorNursery"
                    checked={formData.hasIndoorNursery}
                    onChange={handleChange}
                    className="rounded text-[#C0526F] focus:ring-[#C0526F]/50"
                  />
                  <span>Does the gym have an indoor nursery?</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Gym Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
                ></textarea>

                <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Types of Services Provided *
  </label>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {serviceOptions.map(service => (
      <label key={service} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.services.includes(service)}
          onChange={() => handleServiceChange(service)}
          className="rounded text-[#C0526F] focus:ring-[#C0526F]/50"
        />
        <span className="text-sm sm:text-base">{service}</span>
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
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
    />
  </div>
</div>

                 <label className="block text-sm font-medium text-gray-700">
                    Photo Of Gym *:
                  </label>
                  <input
                 type="file"
                 accept="image/*"
                 onChange={(e) =>
                 setFormData((prev) => ({ ...prev, gymPhoto: e.target.files[0] }))
                 }
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                 />
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="py-3 px-6 sm:px-8 bg-[#C0526F] hover:bg-[#A04460] text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center w-full sm:w-auto justify-center"
                  >
                    Next Step <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            
            )}
  
            {step === 2 && (
              <div className="space-y-6 animate_animated animate_fadeIn">
                 <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      Working Hours *:
    </label>
    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
      <input
        type="time"
        name="openingHour"
        value={formData.openingHour}
        onChange={handleChange}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
        required
      />
      <input
        type="time"
        name="closingHour"
        value={formData.closingHour}
        onChange={handleChange}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
        required
      />
    </div>
  </div>

  {/* Subscription Plans */}
  <div>
    <h3 className="text-lg font-bold text-gray-700 mb-2">Subscription Plans</h3>
    {formData.plans.length > 0 ? (
      <ul className="space-y-2">
        {formData.plans.map((plan, index) => (
          <li
            key={index}
            className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-3 rounded-md border border-gray-200 space-y-2 md:space-y-0"
          >
            <div>
              <span className="font-semibold">{plan.name}</span> - ${plan.price}/month
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => editPlan(index)}
                className="text-[#9C2A46] hover:text-[#C0526F] font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => deletePlan(index)}
                className="text-[#7F55B1] hover:text-[#9B7EBD] font-medium"
                
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-500">No plans added yet.</p>
    )}
  </div>

  {/* Add/Edit Plan Form */}
  <div>
    <h4 className="text-md font-bold text-gray-700 mb-2">
      {isEditing ? "Edit Plan" : "Add New Plan"}
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Plan Name *"
        value={currentPlan.name}
        onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
        required
      />
      <input
        type="number"
        placeholder="Price ($/month) *"
        value={currentPlan.price}
        onChange={(e) => setCurrentPlan({ ...currentPlan, price: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
        required
      />
    </div>
    <div className="flex justify-end mt-4">
      <button
        onClick={isEditing ? saveEditedPlan : addPlan}
        className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300"
      >
        {isEditing ? "Save Changes" : "+ Add Plan"}
      </button>
    </div>
  </div> 
  
  {/* Trainers: */}
                <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Trainers:
  </label>

  {formData.trainers.map((trainer, index) => (
    <div
      key={index}
      className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 mb-2"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={trainer.name}
        onChange={(e) => handleTrainerChange(index, e)}
        className="w-full  px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
      />
      <input
        type="file"
        name="photo"
        onChange={(e) => handleTrainerPhotoChange(index, e)}
        className="w-full  px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#C0526F] focus:border-[#C0526F]"
      />
    </div>
  ))}

  <button
    onClick={addTrainer}
    type="button"
    className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300"
  >
    + Add Trainer
  </button>
</div>

  
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
  <button
    onClick={() => setStep(1)}
    className="bg-gray-700 text-white px-6 py-3 rounded-lg w-full sm:w-auto"
  >
    <span className="mr-2">←</span> Previous
  </button>

  <button
    onClick={() => setStep(3)}
    className="bg-[#C0526F] hover:bg-[#A04460] text-white px-6 py-3 rounded-lg w-full sm:w-auto"
  >
    Next Step <span className="ml-2">→</span>
  </button>
</div>

              </div>
            )}
  
            {step === 3 && (
              <div className="space-y-6 animate_animated animate_fadeIn">
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
                      <Popup>Your Gym Location</Popup>
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
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
  <button
    onClick={() => setStep(2)}
    className="py-3 px-8 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center w-full sm:w-auto"
  >
    <span className="mr-2">←</span> Previous
  </button>

  <button
    type="submit"
    disabled={isSubmitting}
    className={`py-3 px-8 bg-[#C0526F] hover:bg-[#A04460] text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center w-full sm:w-auto ${
      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    {isSubmitting ? "Submitting..." : "Submit"}
    {!isSubmitting && <span className="ml-2">→</span>}
  </button>
</div>

              </div>
            )}
          </form>
  
          {/* Form Footer */}
        <div className="bg-gray-100 p-4 border-t border-gray-300 text-sm text-gray-600">
        <p>
          By submitting this form, you confirm that all information provided is accurate and complete.
        </p>
      </div>
    </div>
  </div>
</div>
  );
};

export default GymRegistrationForm;
