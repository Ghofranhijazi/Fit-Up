// models/Booking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  selectedPlan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentDetails: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paymentStatus: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending",
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  gym_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  nursery_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM("gym", "nursery"),
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Booking;

Booking.associate = (models) => {
  Booking.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  Booking.belongsTo(models.Gym, { foreignKey: "gym_id", as: "gym" });
  Booking.belongsTo(models.Nursery, { foreignKey: "nursery_id", as: "nursery" });
};





