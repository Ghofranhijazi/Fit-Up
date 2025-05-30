// models/Comment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").sequelize; // تأكد من مسار config الصح

const Comment = sequelize.define("Comment", {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  userId: {
    type: DataTypes.UUID, 
    allowNull: false,
  },
  username: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  gymId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  nurseryId: {
    type: DataTypes.UUID,
    allowNull: true,  // We allow null here for gyms
  },

   // ✅ أضف هذا السطر
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = Comment;
