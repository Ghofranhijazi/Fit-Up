// models/Nursery.js
const { DataTypes } = require("sequelize");
const sequelize = require('../config/database').sequelize; // Import Sequelize connection
const User = require('./User'); // Import User model

const Nursery = sequelize.define('Nursery', {
  nurseryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  openingHour: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  closingHour: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.JSON, // Use JSON to store latitude and longitude
    allowNull: true,
  },
  planName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  planPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  planDuration: {
    type: DataTypes.ENUM('Monthly', 'Yearly'),
    defaultValue: 'Monthly',
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Define relationship with User
Nursery.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = Nursery;






// const mongoose = require('mongoose');

// const nurserySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   description: String,
//   workingHours: {
//     openingTime: String,
//     closingTime: String,
//   },
//   pricing: [{
//     planName: String,
//     price: Number,
//     duration: String,
//   }],
//   coordinates: { 
//     latitude: Number, 
//     longitude: Number 
//   },
//   photos: [String],
//   approved: { type: Boolean, default: false }, // for admin approval
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Nursery', nurserySchema);
