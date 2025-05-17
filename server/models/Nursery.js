
// models/Nursery.js
const { DataTypes } = require("sequelize");
const sequelize = require('../config/database').sequelize;

const Nursery = sequelize.define('Nursery', {
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
  nurseryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
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
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  services: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  additionalServices: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.ENUM('nursery', 'daycare'),
    defaultValue: 'nursery',
  },
  nurseryPhoto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  monthlyFee: {
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
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  minAge: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  maxAge: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  location: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  // documents: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  // },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

Nursery.associate = (models) => {
  Nursery.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  Nursery.hasMany(models.Payment, {
    foreignKey: "nursery_id",
    as: "payment",
  });

  Nursery.hasMany(models.Booking, {
    foreignKey: "nursery_id",
    as: "bookings"
  });
};

module.exports = Nursery;

// Nursery.associate = (models) => {
//   Nursery.belongsTo(models.User, {
//     foreignKey: 'user_id',
//     as: 'user'
//   });

//   Nursery.hasMany(models.Payment, {
//     foreignKey: "nursery_id",
//     as: "payment",
//   });
// };
// Nursery.associate = (models) => {
//   Nursery.hasMany(models.Booking, { foreignKey: "nursery_id", as: "bookings" });
// };