const Payment = require("../models/Payment");
const moment = require("moment");

const recordPayment = async (req, res) => {
  try {
    const { user_id, gym_id, plan, amount, status, paypalOrderId } = req.body;

    if (!user_id || !gym_id || !plan || !amount || !paypalOrderId) {
      return res.status(400).json({ message: "Missing required payment data" });
    }

    let subscriptionExpiry = null;

if (plan === "3 Months") {
  subscriptionExpiry = moment().add(3, "months").format("YYYY-MM-DD");
} else if (plan === "6 Months") {
  subscriptionExpiry = moment().add(6, "months").format("YYYY-MM-DD");
} else if (plan === "12 Months") {
  subscriptionExpiry = moment().add(12, "months").format("YYYY-MM-DD");
}

    const payment = await Payment.create({
      user_id,
      gym_id,
      plan,
      amount,
      status,
      paypalOrderId,
      subscriptionExpiry,
    });

    res.status(201).json({ message: "Payment recorded", payment });
  } catch (err) {
    console.error("Error recording payment:", err);
    res.status(500).json({ message: "Failed to record payment" });
  }
};

module.exports = {
  recordPayment,
};
