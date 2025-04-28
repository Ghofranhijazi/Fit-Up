// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const NurseryRegistrationForm = () => {
//   const reduxUser = useSelector((state) => state.user);
//   const localUser = JSON.parse(localStorage.getItem("user"));

//   const user_id = reduxUser?.id || localUser?.id;
//   const email = reduxUser?.email || localUser?.email;

//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentPlan, setCurrentPlan] = useState({ name: "", price: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [savedData, setSavedData] = useState({});

//   const [formData, setFormData] = useState({
//     nurseryName: "",
//     email: email || "",
//     phone: "",
//     address: "",
//     hasOutdoorPlayArea: false,
//     description: "",
//     nurseryPhoto: null,
//     openingHour: "",
//     closingHour: "",
//     location: "",
//     ageGroups: [],
//     price: "",
//     staff: [{ name: "", qualification: "", photo: "" }],
//     coordinates: { lat: 31.963158, lng: 35.930359 },
//   });

//   // Load user-specific data (plan, basic info)
//   useEffect(() => {
//     if (!user_id) return;
  
//     const saved = JSON.parse(localStorage.getItem(`userData-${user_id}`)) || {};
//     const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));
  
//     setSavedData(saved);
//     setFormData((prev) => ({
//       ...prev,
//       nurseryName: saved.nurseryName || prev.nurseryName,
//       email: email || prev.email,
//       planName: selectedPlan?.name || prev.planName,
//       price: selectedPlan?.price || prev.price,
//     }));
//   }, [user_id, email]);

//   const validateForm = () => {
//     if (!formData.nurseryName) return "Nursery name is required";
//     if (!formData.email) return "Email is required";
//     if (!formData.phone) return "Phone number is required";
//     if (!formData.address) return "Address is required";
//     return null;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleStaffChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedStaff = [...formData.staff];
//     updatedStaff[index][name] = value;
//     setFormData((prev) => ({ ...prev, staff: updatedStaff }));
//   };

//   const handleStaffPhotoChange = (index, e) => {
//     const updatedStaff = [...formData.staff];
//     updatedStaff[index].photo = e.target.files[0];
//     setFormData((prev) => ({ ...prev, staff: updatedStaff }));
//   };

//   const addStaff = () => {
//     setFormData((prev) => ({
//       ...prev,
//       staff: [...prev.staff, { name: "", qualification: "", photo: "" }],
//     }));
//   };

//   const addAgeGroup = () => {
//     if (currentPlan.name && currentPlan.price) {
//       setFormData((prev) => ({
//         ...prev,
//         ageGroups: [...prev.ageGroups, currentPlan],
//       }));
//       setCurrentPlan({ name: "", price: "" });
//     }
//   };

//   const editAgeGroup = (index) => {
//     setCurrentPlan(formData.ageGroups[index]);
//     setIsEditing(true);
//     setEditIndex(index);
//   };

//   const saveEditedAgeGroup = () => {
//     const updatedAgeGroups = formData.ageGroups.map((group, index) =>
//       index === editIndex ? currentPlan : group
//     );
//     setFormData((prev) => ({ ...prev, ageGroups: updatedAgeGroups }));
//     setCurrentPlan({ name: "", price: "" });
//     setIsEditing(false);
//     setEditIndex(null);
//   };

//   const deleteAgeGroup = (index) => {
//     const updatedAgeGroups = formData.ageGroups.filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, ageGroups: updatedAgeGroups }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const validationError = validateForm();
//     if (validationError) {
//       alert(validationError);
//       return;
//     }
  
//     if (!user_id) {
//       alert("You must be logged in to submit your request.");
//       navigate("/login");
//       return;
//     }
  
//     // Save data temporarily in localStorage
//     localStorage.setItem(`userData-${user_id}`, JSON.stringify(formData));
  
//     // Navigate to plan selection page
//     navigate("/choose-plan");
//   };

//   const LocationMarker = ({ setCoordinates }) => {
//     useMapEvents({
//       click(e) {
//         setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
//       },
//     });
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-white-to-b from-gray-900 to-black flex flex-col p-6 mt-12">
//       <div className="flex-grow flex items-center justify-center p-4 md:p-8">
//         <div className="bg-white shadow-2xl rounded-lg w-full max-w-4xl overflow-hidden">
//           {/* Form Header */}
//           <div className="bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] p-6 text-white">
//             <h2 className="text-3xl font-bold">Nursery Registration</h2>
//             <p className="mt-2 opacity-80">
//               Fill in the details to register your nursery
//             </p>
//             {/* Progress Indicator */}
//             <div className="mt-6 flex justify-between">
//               <div
//                 className={`flex items-center ${
//                   step >= 1 ? "text-white" : "text-gray-300"
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     step >= 1 ? "bg-white text-[#4CAF50]" : "bg-gray-600"
//                   } font-bold`}
//                 >
//                   1
//                 </div>
//                 <span className="ml-2 hidden sm:inline">Basic Info</span>
//               </div>
//               <div className="flex-grow mx-2 mt-4">
//                 <div className="h-1 bg-gray-600">
//                   <div
//                     className={`h-1 bg-white transition-all duration-500`}
//                     style={{ width: `${(step - 1) * 50}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div
//                 className={`flex items-center ${
//                   step >= 2 ? "text-white" : "text-gray-300"
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     step >= 2 ? "bg-white text-[#4CAF50]" : "bg-gray-600"
//                   } font-bold`}
//                 >
//                   2
//                 </div>
//                 <span className="ml-2 hidden sm:inline">Detailed Info</span>
//               </div>
//               <div className="flex-grow mx-2 mt-4">
//                 <div className="h-1 bg-gray-600">
//                   <div
//                     className={`h-1 bg-white transition-all duration-500`}
//                     style={{ width: `${(step - 2) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div
//                 className={`flex items-center ${
//                   step >= 3 ? "text-white" : "text-gray-300"
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     step >= 3 ? "bg-white text-[#4CAF50]" : "bg-gray-600"
//                   } font-bold`}
//                 >
//                   3
//                 </div>
//                 <span className="ml-2 hidden sm:inline">Location Map</span>
//               </div>
//             </div>
//           </div>
  
//           <form onSubmit={handleSubmit} className="p-6 md:p-8">
//             {step === 1 && (
//               <div className="space-y-6 animate__animated animate__fadeIn">
//                 <input
//                   type="text"
//                   name="nurseryName"
//                   placeholder="Nursery Name *"
//                   value={formData.nurseryName}
//                   onChange={handleChange}
//                   readOnly={!!savedData.nurseryName}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                   required
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email *"
//                   value={formData.email}
//                   onChange={handleChange}
//                   readOnly={email}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                   required
//                 />
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone *"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                   required
//                 />
//                 <textarea
//                   name="address"
//                   placeholder="Address *"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                   required
//                 ></textarea>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     name="hasOutdoorPlayArea"
//                     checked={formData.hasOutdoorPlayArea}
//                     onChange={handleChange}
//                     className="rounded text-[#4CAF50] focus:ring-[#4CAF50]/50"
//                   />
//                   <span>Does the nursery have an outdoor play area?</span>
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Nursery Description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                 ></textarea>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Photo Of Nursery *:
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) =>
//                     setFormData((prev) => ({ ...prev, nurseryPhoto: e.target.files[0] }))
//                   }
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//                 <div className="flex justify-end pt-4">
//                   <button
//                     onClick={() => setStep(2)}
//                     className="py-3 px-8 bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center"
//                   >
//                     Next Step <span className="ml-2">→</span>
//                   </button>
//                 </div>
//               </div>
//             )}
  
//             {step === 2 && (
//               <div className="space-y-6 animate__animated animate__fadeIn">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Operating Hours *:
//                   </label>
//                   <div className="flex space-x-2">
//                     <input
//                       type="time"
//                       name="openingHour"
//                       value={formData.openingHour}
//                       onChange={handleChange}
//                       className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                       required
//                     />
//                     <input
//                       type="time"
//                       name="closingHour"
//                       value={formData.closingHour}
//                       onChange={handleChange}
//                       className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-bold text-gray-700 mb-2">Age Groups</h3>
//                   {formData.ageGroups.length > 0 ? (
//                     <ul className="space-y-2">
//                       {formData.ageGroups.map((group, index) => (
//                         <li
//                           key={index}
//                           className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200"
//                         >
//                           <div>
//                             <span className="font-semibold">{group.name}</span> - ${group.price}/month
//                           </div>
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() => editAgeGroup(index)}
//                               className="text-blue-500 hover:text-blue-700 font-medium"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => deleteAgeGroup(index)}
//                               className="text-red-500 hover:text-red-700 font-medium"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-sm text-gray-500">No age groups added yet.</p>
//                   )}
//                 </div>

//                 {/* Add/Edit Age Group Form */}
//                 <div>
//                   <h4 className="text-md font-bold text-gray-700 mb-2">
//                     {isEditing ? "Edit Age Group" : "Add New Age Group"}
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Age Group Name *"
//                       value={currentPlan.name}
//                       onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                       required
//                     />
//                     <input
//                       type="number"
//                       placeholder="Price ($/month) *"
//                       value={currentPlan.price}
//                       onChange={(e) => setCurrentPlan({ ...currentPlan, price: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                       required
//                     />
//                   </div>
//                   <div className="flex justify-end mt-4">
//                     <button
//                       onClick={isEditing ? saveEditedAgeGroup : addAgeGroup}
//                       className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300"
//                     >
//                       {isEditing ? "Save Changes" : "+ Add Age Group"}
//                     </button>
//                   </div>
//                 </div>
  
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Staff Members:
//                   </label>
//                   {formData.staff.map((member, index) => (
//                     <div key={index} className="flex space-x-2 mb-2">
//                       <input
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         value={member.name}
//                         onChange={(e) => handleStaffChange(index, e)}
//                         className="w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                       />
//                       <input
//                         type="text"
//                         name="qualification"
//                         placeholder="Qualification"
//                         value={member.qualification}
//                         onChange={(e) => handleStaffChange(index, e)}
//                         className="w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                       />
//                       <input
//                         type="file"
//                         name="photo"
//                         onChange={(e) => handleStaffPhotoChange(index, e)}
//                         className="w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#4CAF50] focus:border-[#4CAF50]"
//                       />
//                     </div>
//                   ))}
//                   <button
//                     onClick={addStaff}
//                     type="button"
//                     className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300"
//                   >
//                     + Add Staff Member
//                   </button>
//                 </div>
  
//                 <div className="flex justify-between pt-4">
//                   <button
//                     onClick={() => setStep(1)}
//                     className="py-3 px-8 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center"
//                   >
//                     <span className="mr-2">←</span> Previous
//                   </button>
//                   <button
//                     onClick={() => setStep(3)}
//                     className="py-3 px-8 bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center"
//                   >
//                     Next Step <span className="ml-2">→</span>
//                   </button>
//                 </div>
//               </div>
//             )}
  
//             {step === 3 && (
//               <div className="space-y-6 animate__animated animate__fadeIn">
//                 <div className="space-y-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Location on the Map:
//                   </label>
//                   <MapContainer
//                     center={[formData.coordinates.lat, formData.coordinates.lng]}
//                     zoom={13}
//                     style={{ height: "300px", width: "100%" }}
//                   >
//                     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                     <Marker position={[formData.coordinates.lat, formData.coordinates.lng]}>
//                       <Popup>Your Nursery Location</Popup>
//                     </Marker>
//                     <LocationMarker
//                       setCoordinates={(coords) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           coordinates: coords,
//                         }))
//                       }
//                     />
//                   </MapContainer>
//                 </div>
//                 <div className="flex justify-between pt-4">
//                   <button
//                     onClick={() => setStep(2)}
//                     className="py-3 px-8 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center"
//                   >
//                     <span className="mr-2">←</span> Previous
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`py-3 px-8 bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-semibold rounded-md shadow-md transition duration-300 flex items-center ${
//                       isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {isSubmitting ? 'Submitting...' : 'Submit Application'}
//                     {!isSubmitting && <span className="ml-2">→</span>}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </form>
  
//           {/* Form Footer */}
//           <div className="bg-gray-100 p-4 border-t border-gray-300 text-sm text-gray-600">
//             <p>
//               By submitting this form, you confirm that all information provided
//               is accurate and complete.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NurseryRegistrationForm;