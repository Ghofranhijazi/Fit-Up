// models/Gym.js
const { DataTypes } = require("sequelize");
const sequelize = require('../config/database').sequelize; // Import Sequelize connection
// const Booking = require('./Booking');  

const Gym = sequelize.define('Gym', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  gymName: {
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
  hasIndoorNursery: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  category: {
    type: DataTypes.ENUM('gym', 'gymWithNursery'),
    defaultValue: 'gym',
  },
  gymPhoto: {
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
  plans: {
    type: DataTypes.JSON, // Use JSON to store subscription plans
    allowNull: true,
  },
  trainers: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

module.exports = Gym;

// تحديد العلاقة بين Gym و Booking
// Gym.hasMany(Booking, { foreignKey: 'gym_id' });
