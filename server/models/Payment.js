const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").sequelize;

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  gym_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  plan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
  },
  paypalOrderId: { type: DataTypes.STRING },
  subscriptionExpiry: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true,
});

module.exports = Payment;


Payment.associate = (models) => {
  Payment.belongsTo(models.Gym, {
    foreignKey: "gym_id",
    as: "gym",
  });
};
