// pages/PlansPage.jsx
import { useNavigate } from "react-router-dom";

const plans = [
  { name: "شهر", price: 50 },
  { name: "شهرين", price: 90 },
  { name: "3 شهور", price: 130 },
  { name: "6 شهور", price: 250 },
];

const PlansPage = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    // نرسل الخطة إلى الفورم عبر route params أو localStorage
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    navigate("/register-gym");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">اختر خطة الاشتراك</h2>
      <div className="grid gap-4">
        {plans.map((plan, idx) => (
          <div key={idx} className="border p-4 rounded-md shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p>{plan.price} دينار</p>
            </div>
            <button
              onClick={() => handlePlanSelect(plan)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              اشترك الآن
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
