// // models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;


const User = sequelize.define('User', {
  user_id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'gymOwner', 'nurseryOwner', 'admin'),
    defaultValue: 'user',
    allowNull: false
  },
  // verified: {
  //   type: DataTypes.BOOLEAN, // (isApproved) فقط يظهر البروفايل إذا وافق الأدمن
  //   defaultValue: false
  // },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profileImage: {
    type: DataTypes.STRING, // Store the image URL or file path here
    allowNull: true
  },
  address: {
        type: DataTypes.STRING,
        allowNull: true
      }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

User.associate = (models) => {
  User.hasMany(models.Comment, { foreignKey: "userId" });
};

module.exports = User;

