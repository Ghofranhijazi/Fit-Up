import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const plans = [
  { name: "3 Months", price: 90 },
  { name: "6 Months", price: 130 },
  { name: "12 Months", price: 280 },
];

const PlanPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [gymId, setGymId] = useState(null);

  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const prepareFormAndGym = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userData = JSON.parse(localStorage.getItem(`userData-${user?.id}`));

    if (!user || !userData) {
      alert("User data missing. Please fill the form again.");
      return null;
    }

    const form = new FormData();
    form.append("user_id", user.id);
    form.append("gymName", userData.gymName);
    form.append("email", userData.email);
    form.append("phone", userData.phone);
    form.append("address", userData.address);
    form.append("hasIndoorNursery", userData.hasIndoorNursery);
    form.append("description", userData.description);
    form.append("openingHour", userData.openingHour);
    form.append("closingHour", userData.closingHour);
    form.append("location", JSON.stringify(userData.coordinates));
    form.append("plans", JSON.stringify(userData.plans));
    form.append("category", "gym");

    form.append("trainers", JSON.stringify(
      userData.trainers.map((trainer, i) => ({
        name: trainer.name,
        experience: trainer.experience,
        photo: trainer.photo ? `trainer-${i}-${trainer.photo.name}` : null,
      }))
    ));

    if (userData.gymPhoto) {
      form.append("gymPhoto", userData.gymPhoto);
    }

    userData.trainers.forEach((trainer, i) => {
      if (trainer.photo instanceof File) {
        form.append("trainerPhotos", trainer.photo, `trainer-${i}-${trainer.photo.name}`);
      }
    });

    try {
      const gymRes = await axios.post("http://localhost:5000/api/gyms/add-gym", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return { gymId: gymRes.data.gym.id, user };
    } catch (err) {
      console.error("Error saving gym:", err);
      alert("Error saving gym info.");
      return null;
    }
  };

  const handlePaymentSuccess = async (details) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post("http://localhost:5000/api/payments/record", {
        user_id: user.id,
        gym_id: gymId,
        plan: selectedPlan.name,
        amount: selectedPlan.price,
        status: "completed",
        paypalOrderId: details.id,
      });

      alert("Payment successful and gym submitted!");
      navigate("/"); // Or redirect wherever you want
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Payment succeeded but failed to save record.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Choose Your Subscription Plan</h2>
        <div className="grid gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              onClick={() => handlePlanSelect(plan)}
              className={`p-4 border rounded-lg cursor-pointer transition ${
                selectedPlan?.name === plan.name
                  ? "border-[#C0526F] bg-[#FBEFF1]"
                  : "border-gray-300 hover:border-[#C0526F]"
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-gray-600">{plan.price} JD</p>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-8">
            <PayPalScriptProvider options={{ "client-id": "AVmgi8KF0NxAeYwETCn4kXs8aI47iSEoQufeFSdappVK9bay-kRdQlBT5tN2YdGcCZlernN3f65YgNt5" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                fundingSource="paypal"
                createOrder={async (data, actions) => {
                  // Ensure gym is saved before creating order
                  const result = await prepareFormAndGym();
                  if (!result) throw new Error("Gym save failed");
                  setGymId(result.gymId);
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: selectedPlan.price.toString()
                      }
                    }]
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  await handlePaymentSuccess(details);
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanPage;
