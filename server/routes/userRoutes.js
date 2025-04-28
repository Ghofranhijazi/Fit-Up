const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { getAllUsers , updateRole } = require('../controllers/userController');
const upload = require('../Middlewares/upload');

// جلب البيانات
router.get('/users/:userId', userController.getProfile);

// تعديل البيانات
router.put('/users/:userId', upload.single('profileImage'), userController.updateProfile);

// إضافة route لعرض الحجوزات الخاصة بصاحب الجيم
router.get('/owners/:ownerId/bookings', userController.getOwnerBookings);

// routes/userRoutes.js
router.put('/bookings/:bookingId/status', userController.updateBookingStatus);

//for admin dash
router.get('/all', getAllUsers);

// router.patch("/update-role/:userId", updateRole);

module.exports = router;