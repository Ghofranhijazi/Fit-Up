const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  description: String,
  workingHours: {
    openingTime: String,
    closingTime: String,
  },
  pricing: [{
    planName: String,
    price: Number,
    duration: String, // e.g. Monthly, Yearly
  }],
  category: { 
    type: String, 
    enum: ['Women Only', 'On-Site Nursery', 'Nearby Nursery'],
    required: true
  },
  coordinates: { 
    latitude: Number, 
    longitude: Number 
  },
  onSiteNursery: { type: mongoose.Schema.Types.ObjectId, ref: 'Nursery' }, // if available
  photos: [String], // URLs
  trainers: [{
    name: String,
    expertise: String,
    image: String
  }],
  approved: { type: Boolean, default: false }, // for admin approval
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gym', gymSchema);
