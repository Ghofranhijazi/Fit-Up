const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema({
  category: { type: String, enum: ['Gym', 'Nursery', 'Gym with On-Site Nursery'], required: true },
  businessInfo: {
    name: String,
    address: String,
    email: String,
    phone: String,
  },
  details: mongoose.Schema.Types.Mixed, // flexible schema for additional details
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JoinRequest', joinRequestSchema);
