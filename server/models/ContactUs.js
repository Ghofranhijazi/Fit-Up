// models/ContactUs.js
const { DataTypes } = require("sequelize");
const sequelize = require('../config/database').sequelize;// Import Sequelize connection
const User = require('./User'); // Import User model

const ContactUs = sequelize.define('ContactUs', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Define relationship with User
ContactUs.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ContactUs;
