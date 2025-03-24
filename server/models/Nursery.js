const mongoose = require('mongoose');

const nurserySchema = new mongoose.Schema({
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
    duration: String,
  }],
  coordinates: { 
    latitude: Number, 
    longitude: Number 
  },
  photos: [String],
  approved: { type: Boolean, default: false }, // for admin approval
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nursery', nurserySchema);
