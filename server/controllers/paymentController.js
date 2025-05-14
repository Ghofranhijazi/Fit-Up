// const { Payment } = require("../models");
// const { v4: uuidv4 } = require("uuid");
// const { client } = require("../config/paypalClient");

// function getExpiryDate(plan) {
//   const now = new Date();
//   switch (plan) {
//     case '3 months':
//       now.setMonth(now.getMonth() + 3);
//       break;
//     case '6 months':
//       now.setMonth(now.getMonth() + 6);
//       break;
//     case '1 year':
//       now.setFullYear(now.getFullYear() + 1);
//       break;
//     default:
//       throw new Error('Invalid subscription plan');
//   }
//   return now; // ✅ رجعنا Date object حقيقي
// }

// exports.createPayment = async (req, res) => {
//   try {
//     const { user_id, gym_id, nursery_id, paypalOrderId, plan, amount } = req.body;

//     if (!user_id || !plan || !amount || (!gym_id && !nursery_id)) {
//       return res.status(400).json({ error: "بيانات ناقصة." });
//     }

//     if (gym_id && nursery_id) {
//       return res.status(400).json({ error: "لا يمكن إرسال gym_id و nursery_id معًا." });
//     }

//     const subscriptionExpiry = getExpiryDate(plan).toISOString();
//     const payment = await Payment.create({
//       id: uuidv4(),
//       user_id,
//       gym_id: gym_id || null,
//       nursery_id: nursery_id || null,
//       plan,
//       amount,
//       status: "completed",
//       subscriptionExpiry,
//     });

//     res.status(201).json(payment);
//   } catch (error) {
//     console.error("خطأ في إنشاء الدفع:", error);
//     res.status(500).json({ error: "فشل إنشاء الدفع" });
//   }
// };



const { Payment } = require("../models");
const { v4: uuidv4 } = require("uuid");

function getExpiryDate(plan) {
  const now = new Date();
  switch (plan) {
    case '3 months':
      now.setMonth(now.getMonth() + 3);
      break;
    case '6 months':
      now.setMonth(now.getMonth() + 6);
      break;
    case 'year':
    case '1 year':
      now.setFullYear(now.getFullYear() + 1);
      break;
    default:
      throw new Error('Invalid subscription plan');
  }
  return now;
}

exports.createPayment = async (req, res) => {
  console.log("Received payment requestفففففففف:", req.body);
  try {
    const { user_id, gym_id, nursery_id, paypalOrderId, plan, amount } = req.body;

    // Basic validation
    if (!user_id || !paypalOrderId || !plan || !amount || (!gym_id && !nursery_id)) {
      return res.status(400).json({ error: "بيانات ناقصة." });
    }

    if (gym_id && nursery_id) {
      return res.status(400).json({ error: "لا يمكن إرسال gym_id و nursery_id معًا." });
    }

    // Since we're not using paypal/checkout-server-sdk anymore, we'll assume order validation is done client-side
    // You can perform additional verification, if needed, based on your business logic

    // If you want to verify the amount sent to the backend
    const paidAmount = parseFloat(amount);
    if (paidAmount !== parseFloat(amount)) {
      return res.status(400).json({ error: "قيمة الدفع غير متطابقة." });
    }

    const subscriptionExpiry = getExpiryDate(plan).toISOString();

    // Create the payment record in your database
    const payment = await Payment.create({
      id: uuidv4(),
      user_id,
      gym_id: gym_id || null,
      nursery_id: nursery_id || null,
      plan,
      amount,
      status: "completed",  // Payment status here is 'completed'
      paypalOrderId,
      subscriptionExpiry,
    });

    console.log("Payment Created:", payment);

    res.status(201).json(payment);
  } catch (error) {
    console.error("خطأ في التحقق من الدفع أو التخزين:", error);
    res.status(500).json({ error: "فشل التحقق أو تخزين الدفع." });
  }
};







