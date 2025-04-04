// models/Booking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;
const Gym = require('./Gym'); // نموذج الجيم
const User = require('./User');

// تعريف النموذج
const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('gym', 'nursery'),
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
    allowNull: false,
  },
  selectedPlan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  paymentDetails: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  gym_id: {  
    type: DataTypes.UUID,
    allowNull: true,
  },
  user_id: {  
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  timestamps: true,
});

// تحديد العلاقة بين الجداول
Booking.belongsTo(Gym, { foreignKey: 'gym_id' });  // العلاقة بين Booking و Gym
Gym.hasMany(Booking, { foreignKey: 'gym_id' });   // العلاقة العكسية بين Gym و Booking
Booking.belongsTo(User, { foreignKey: 'user_id' }); // كل حجز ينتمي إلى مستخدم واحد

module.exports =  Booking ;




// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
//   nursery: { type: mongoose.Schema.Types.ObjectId, ref: 'Nursery' },
//   bookingDate: Date,
//   message: String,
//   status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Booking', bookingSchema);
