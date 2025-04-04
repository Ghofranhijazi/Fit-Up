// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;
// const Booking = require('./Booking');  

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
  verified: {
    type: DataTypes.BOOLEAN, // (isApproved) فقط يظهر البروفايل إذا وافق الأدمن
    defaultValue: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = User;


// تحديد العلاقة بين User و Booking
// User.hasMany(Booking, { foreignKey: 'user_id' });


// Hash password before saving
// User.beforeCreate(async (user) => {
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
// });

// Compare password
// User.prototype.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };




// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });