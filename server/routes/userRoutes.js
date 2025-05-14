const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { getAllUsers, updateRole } = require('../controllers/userController');
const upload = require('../Middlewares/upload');

// جلب بيانات المستخدم
router.get('/users/:userId', userController.getProfile);

// تعديل بيانات المستخدم
router.put('/users/:userId', upload.single('profileImage'), userController.updateProfile);

// عرض الحجوزات الخاصة بصاحب الجيم (Gym)
router.get('/owners/:ownerId/bookings', userController.getOwnerBookings);

// عرض الحجوزات الخاصة بصاحب الحضانة (Nursery)
router.get('/nurseries/:nurseryOwnerId/bookings', userController.getNurseryBookings);

// تحديث حالة الحجز
router.put('/bookings/:bookingId/status', userController.updateBookingStatus);

// for admin dash
router.get('/all', getAllUsers);

module.exports = router;
