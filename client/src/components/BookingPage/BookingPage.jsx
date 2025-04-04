import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion';

const BookingPage = () => {
  const { id } = useParams(); // ✅ اجلب ID من الرابط فقط
  console.log("Received ID:", id);  // ✅ افحصي إذا كان ID يصل للمكون

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookingDate: "",
    selectedPlan: "",
  });
  const [plans, setPlans] = useState([]);
  const [showPaymentSection, setShowPaymentSection] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("No ID received in BookingPage");
      return;
    }

    const fetchPlans = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/gyms/${id}/plans`);
        console.log("Received plans from API:", response.data); // ✅ افحصي البيانات القادمة من السيرفر
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, [id]); // ✅ استدعاء عند تغيّر ID فقط

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPaymentSection(true);
  };

  const handlePaymentSuccess = async (details, data) => {
    console.log("Payment Successful", details, data);
    alert("Payment successful! Your order will be reviewed to complete the booking process.");

    const userId = localStorage.getItem("user_id"); // افترض أنه تم تخزينه بعد تسجيل الدخول

    if (!userId || !id) {
      alert("An error occurred retrieving user or gym data.");
      return;
    }

    // إرسال البيانات إلى الـ backend لحفظ الحجز
    const bookingData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bookingDate: formData.bookingDate,
      selectedPlan: formData.selectedPlan,
      paymentDetails: details,
      type: "gym",             // 📌 أضف نوع الحجز
      gym_id: id,              // 📌 استخدم ID الجيم من useParams
      user_id: userId          // 📌 اجلب الـ user_id من localStorage
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/booking/create', bookingData);
      console.log('Booking saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 pb-10 pt-23">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-[#662480] p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E3007E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Book Your Spot
          </h2>
          <p className="text-gray-600 text-sm">
            Please fill in your details to complete your booking
          </p>
        </motion.div>
  
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-focus-within:text-[#662480] transition-colors duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full pl-10 py-3 border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#662480] focus:border-[#662480] text-left transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
          </div>
  
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-focus-within:text-[#662480] transition-colors duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full pl-10 py-3 border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#662480] focus:border-[#662480] text-left transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>
          </div>
  
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-focus-within:text-[#662480] transition-colors duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="block w-full pl-10 py-3 border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#662480] focus:border-[#662480] text-left transition-all duration-200"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
  
          {/* Booking Date */}
          <div>
            <label
              htmlFor="bookingDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Booking Date
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-focus-within:text-[#662480] transition-colors duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
                className="block w-full pl-10 py-3 border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#662480] focus:border-[#662480] text-left transition-all duration-200"
              />
            </div>
          </div>
  
          {/* Select a Plan */}
          <div>
            <label
              htmlFor="selectedPlan"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select a Plan
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 group-focus-within:text-[#662480] transition-colors duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <select
                name="selectedPlan"
                value={formData.selectedPlan}
                onChange={(e) =>
                  setFormData({ ...formData, selectedPlan: parseFloat(e.target.value) })
                }
                required
                className="block w-full pl-10 py-3 border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#662480] focus:border-[#662480] text-left transition-all duration-200 appearance-none"
              >
                <option value="">Select a plan</option>
                {plans.map((plan, index) => (
                  <option key={index} value={plan.price}>
                    {plan.name} - ${plan.price}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
  
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-[#662480] to-[#E3007E] hover:from-[#E3007E] hover:to-[#662480] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#662480] transform hover:scale-105 transition duration-200"
          >
            Proceed to Payment
          </motion.button>
        </form>
  
        {/* Payment Section */}
        {showPaymentSection && formData.selectedPlan && (
          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Complete your payment
                </span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <PayPalScriptProvider options={{ "client-id": "AVmgi8KF0NxAeYwETCn4kXs8aI47iSEoQufeFSdappVK9bay-kRdQlBT5tN2YdGcCZlernN3f65YgNt5" }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: { value: formData.selectedPlan.toString() }
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handlePaymentSuccess(details, data);
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingPage;



