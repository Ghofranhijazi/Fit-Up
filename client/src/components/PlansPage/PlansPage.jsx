import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const plans = [
  { 
    label: "Starter", 
    price: 90, 
    duration: "3 months",
    features: [
      "Business profile listing",
      "Basic analytics dashboard",
      "Up to 5 service listings",
    ],
    popular: false
  },
  { 
    label: "Professional", 
    price: 130, 
    duration: "6 months",
    features: [
      "Everything in Starter plan",
      "Advanced analytics",
      "Up to 15 service listings",
      "Priority customer support",
    ],
    popular: true,
    savings: "Save 15%"
  },
  { 
    label: "Enterprise", 
    price: 280, 
    duration: "1 year",
    features: [
      "Everything in Professional plan",
      "Unlimited service listings",
      "Featured placement on homepage",
      "Dedicated account manager",
    ],
    popular: false,
    savings: "Save 30%"
  },
];

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user_id = localStorage.getItem("user_id");
  const gym_id = localStorage.getItem("gym_id");
  const nursery_id = localStorage.getItem("nursery_id");

  useEffect(() => {
    if (selectedPlan) {
      localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
    }
  }, [selectedPlan]);

  if (!user_id) {
     toast.err("Please log in.");
    return null;
  }

  const handleApprove = async (data) => {
    if (!selectedPlan) return;
    setLoading(true);
  
    try {

      console.log("user_id:", user_id);
console.log("gym_id from localStorage:", gym_id);
console.log("nursery_id from localStorage:", nursery_id);

      const payload = {
        user_id,
        plan: selectedPlan.duration,
        amount: selectedPlan.price,
        paypalOrderId: data.orderID,
      };
  
      if (nursery_id && !gym_id) {
        payload.nursery_id = nursery_id;
        localStorage.removeItem("gym_id"); // 🔥 امسحي gym_id
      } else if (gym_id && !nursery_id) {
        payload.gym_id = gym_id;
        localStorage.removeItem("nursery_id"); // 🔥 امسحي nursery_id
      }
  
      console.log("Sending to /api/payment/create:", payload);
  
      await axios.post("http://localhost:5000/api/payment/create", payload);
  
      // 🧹 نظّفي ال localStorage بعد الاشتراك
      localStorage.removeItem("nursery_id");
      localStorage.removeItem("gym_id");
  
    toast.success("Your subscription has been successful. Your request will be reviewed by the administration.");
      navigate("/");
    } catch (err) {
      console.error(err);
     toast.error("Failed to execute payment.");
    } finally {
      setLoading(false);
    }
  };

  // const convertedPrice = selectedPlan ? (selectedPlan.price * 1.41).toFixed(2) : "0.00";
  return (
  <PayPalScriptProvider
  options={{
    "client-id": "AWlqK69G-HWWsKgNdZSxt8Zu1NoS6cxDw9FykkNDBaO0t-dc9QWoMX7H-rrgffswXyvtgy0NHmqtbZXQ",
    currency: "USD",
    intent: "capture",
  }}
>
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Grow Your {gym_id ? "Gym" : "Nursery"} Business
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Join Jordan's premier platform for {gym_id ? "fitness centers" : "childcare services"}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
              selectedPlan?.price === plan.price
                ? "ring-4 ring-[#9C2A46] border-[#9C2A46]"
                : "border border-gray-200"
            } ${plan.popular ? "transform md:-translate-y-4" : ""}`}
            onClick={() => setSelectedPlan(plan)}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-[#9C2A46] text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                RECOMMENDED
              </div>
            )}

            {plan.savings && (
              <div className="absolute top-0 left-0 bg-[#C0526F] text-white px-3 py-1 text-xs font-bold rounded-br-lg">
                {plan.savings}
              </div>
            )}

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.label}</h2>
              <p className="text-4xl font-extrabold text-[#9C2A46] mb-1">{plan.price} JOD</p>
              <p className="text-gray-500 mb-4">for {plan.duration}</p>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-[#C0526F] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium text-white ${
                  selectedPlan?.price === plan.price
                    ? "bg-[#9C2A46] hover:bg-[#8a253d]"
                    : "bg-[#C0526F] hover:bg-[#d1637f]"
                } transition-colors duration-300`}
              >
                {selectedPlan?.price === plan.price ? "Selected" : "Select Plan"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-16 max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Business Subscription</h2>
            <p className="mt-2 text-gray-600">
              You're subscribing to the <span className="font-semibold text-[#9C2A46]">{selectedPlan.label}</span> plan
              for your {gym_id ? "gym" : "nursery"}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Subscription Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Business Type:</span>
                <span className="font-medium capitalize">{gym_id ? "Gym" : "Nursery"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">{selectedPlan.label}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{selectedPlan.duration}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-lg text-[#9C2A46]">{selectedPlan.price} JOD</span>
              </div>
            </div>
          </div>

          <div className="paypal-container">
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "gold",
                shape: "pill",
                label: "subscribe",
                height: 48,
              }}
              createOrder={(_, actions) =>
                actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: selectedPlan.price.toString(),
                        currency_code: "USD", 
                      },
                    },
                  ],
                })
              }
              onApprove={(data, actions) => {
                console.log("PayPal order ID:", data.orderID);
                return actions.order.capture().then(() => handleApprove(data));
              }}
              onError={(err) => {
                console.error("PayPal error", err);
               toast.error("Payment failed. Please try again.");
              }}
            />
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <div className="flex">
              <svg className="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-blue-800">What happens next?</h4>
                <p className="text-sm text-blue-600 mt-1">
                  After payment, our team will verify your {gym_id ? "gym" : "nursery"} details and activate your
                  business profile within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</PayPalScriptProvider>
  );
}