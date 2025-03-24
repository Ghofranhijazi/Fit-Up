const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
  nursery: { type: mongoose.Schema.Types.ObjectId, ref: 'Nursery' },
  bookingDate: Date,
  message: String,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
