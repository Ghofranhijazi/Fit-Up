// // choose-plan.jsx
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const plans = [
//   { label: "3 أشهر", price: 90, duration: "3 months" },
//   { label: "6 أشهر", price: 130, duration: "6 months" },
//   { label: "سنة", price: 280, duration: "year" },
// ];

// export default function PlansPage() {
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

// const user_id = localStorage.getItem("user_id");
// const gym_id = localStorage.getItem("gym_id");
// const nursery_id = localStorage.getItem("nursery_id");
// localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));


// if (!user_id) {
//   alert("لم يتم العثور على هوية المستخدم. الرجاء تسجيل الدخول.");
//   return;
// }

// const handleSubscribe = async () => {
//   if (!selectedPlan) return;
//   setLoading(true);

//   try {
//     const payload = {
//       user_id,
//       plan: selectedPlan.duration,
//       amount: selectedPlan.price,
//     };

//     if (nursery_id) {
//       payload.nursery_id = nursery_id;
//     } else if (gym_id) {
//       payload.gym_id = gym_id;
//     }

//     console.log("Sending to /api/payment/create:", payload);

//     await axios.post("http://localhost:5000/api/payment/create", payload);

//     alert("تم الاشتراك بنجاح، سيتم مراجعة طلبك من قبل الإدارة.");
//     navigate("/");
//   } catch (err) {
//     console.error(err);
//     alert("فشل في تنفيذ الدفع.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="p-8 grid md:grid-cols-3 gap-6">
//       {plans.map((plan, index) => (
//         <div
//           key={index}
//           className={`border rounded-2xl p-6 shadow-md hover:shadow-xl cursor-pointer ${
//             selectedPlan?.price === plan.price ? "border-blue-600" : "border-gray-300"
//           }`}
//           onClick={() => setSelectedPlan(plan)}
//         >
//           <h2 className="text-xl font-bold mb-2">{plan.label}</h2>
//           <p className="text-2xl text-blue-600">{plan.price} JD</p>
//         </div>
//       ))}
//       <div className="md:col-span-3 text-center mt-6">
//         <button
//           onClick={handleSubscribe}
//           disabled={loading || !selectedPlan}
//           className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "جاري المعالجة..." : "إتمام الدفع"}
//         </button>
//       </div>
//     </div>
//   );
// }


// if (!nursery_id) {
//   alert("لا يوجد معرف للحضانة. الرجاء التسجيل أولاً.");
//   // navigate("/add-nursery");
//   return;
// }


// choose-plan.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const plans = [
  { label: "3 أشهر", price: 90, duration: "3 months" },
  { label: "6 أشهر", price: 130, duration: "6 months" },
  { label: "سنة", price: 280, duration: "year" },
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
    alert("لم يتم العثور على هوية المستخدم. الرجاء تسجيل الدخول.");
    return null;
  }

  // if (!nursery_id && !gym_id) {
  //   alert("الرجاء تسجيل حضانة أو جيم أولاً.");
  //   return;
  // }

  

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
  
      alert("تم الاشتراك بنجاح، سيتم مراجعة طلبك من قبل الإدارة.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("فشل في تنفيذ الدفع.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AWlqK69G-HWWsKgNdZSxt8Zu1NoS6cxDw9FykkNDBaO0t-dc9QWoMX7H-rrgffswXyvtgy0NHmqtbZXQ" }}>
      <div className="p-8 grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border rounded-2xl p-6 shadow-md hover:shadow-xl cursor-pointer ${
              selectedPlan?.price === plan.price ? "border-blue-600" : "border-gray-300"
            }`}
            onClick={() => setSelectedPlan(plan)}
          >
            <h2 className="text-xl font-bold mb-2">{plan.label}</h2>
            <p className="text-2xl text-blue-600">{plan.price} JD</p>
          </div>
        ))}

        {selectedPlan && (
          <div className="md:col-span-3 mt-6 text-center">
            <PayPalButtons
              style={{ layout: "vertical" }}
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
                alert("فشل في إتمام عملية الدفع.");
              }}
            />
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
}







