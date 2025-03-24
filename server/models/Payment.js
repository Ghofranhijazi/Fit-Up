const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    method: { type: String, enum: ["card", "paypal", "cash"] },
    subscriptionType: { type: String, enum: ["monthly", "yearly"] },
    status: { type: String, enum: ["success", "failed", "pending"] },
    transactionId: String, // من بوابة الدفع
    createdAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Payment', paymentSchema);
  