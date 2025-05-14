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
    allowNull: true,
  },
  nursery_id: {
    type: DataTypes.UUID,
    allowNull: true,
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
  paypalOrderId:{ 
    
    type: DataTypes.STRING 
   },

  subscriptionExpiry: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true,
});

Payment.associate = (models) => {
  Payment.belongsTo(models.Gym, { foreignKey: "gym_id", as: "gym" });
  Payment.belongsTo(models.Nursery, { foreignKey: "nursery_id", as: "nursery" });
};

module.exports = Payment;





// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database").sequelize;

// const Payment = sequelize.define("Payment", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   user_id: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   gym_id: {
//     type: DataTypes.UUID,
//     allowNull: true, // Make this optional
//   },
//   nursery_id: {
//     type: DataTypes.UUID,
//     allowNull: true, // Make this optional
//   },
//   plan: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   amount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.ENUM("pending", "completed", "failed"),
//     defaultValue: "pending",
//   },
//   paypalOrderId: { type: DataTypes.STRING },
//   subscriptionExpiry: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   type: {
//     type: DataTypes.ENUM("gym", "nursery"),
//     allowNull: false,
//   }
// }, {
//   timestamps: true,
// });

// module.exports = Payment;

// Payment.associate = (models) => {
//   Payment.belongsTo(models.Gym, {
//     foreignKey: "gym_id",
//     as: "gym",
//   });
  
//   Payment.belongsTo(models.Nursery, {
//     foreignKey: "nursery_id",
//     as: "nursery",
//   });
// };