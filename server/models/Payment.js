// models/Payment.js
const { DataTypes } = require("sequelize");
const sequelize = require('../config/database').sequelize; // Import Sequelize connection
const User = require('./User'); // Import User model

const Payment = sequelize.define('Payment', {
  entityType: {
    type: DataTypes.ENUM('gym', 'nursery'),
    allowNull: false,
  },
  entityId: {
    type: DataTypes.INTEGER, // Assuming entityId will reference Gym or Nursery IDs
    allowNull: false,
  },
  planName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid'),
    defaultValue: 'pending',
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Define relationship with User
Payment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Payment;



// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     amount: Number,
//     method: { type: String, enum: ["card", "paypal", "cash"] },
//     subscriptionType: { type: String, enum: ["monthly", "yearly"] },
//     status: { type: String, enum: ["success", "failed", "pending"] },
//     transactionId: String, // من بوابة الدفع
//     createdAt: { type: Date, default: Date.now }
//   });

//   module.exports = mongoose.model('Payment', paymentSchema);
  