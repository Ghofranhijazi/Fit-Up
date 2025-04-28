const Booking = require('../models/Booking'); 

// إضافة حجز جديد
   const createBooking = async (req, res) => {
    const { username, email, phone, bookingDate, selectedPlan, paymentDetails, gym_id, user_id, type } = req.body;
    
    try {
      const newBooking = await Booking.create({
        username,
        email,
        phone,
        bookingDate,
        selectedPlan,
        paymentDetails: JSON.stringify(paymentDetails), // تخزين تفاصيل الدفع بصيغة JSON
        paymentStatus: 'completed', // تم الدفع
        status: 'pending', // وضع الحجز
        gym_id,
        user_id,
        type,
      });
      
      res.status(201).json({
        message: 'Booking created successfully',
        booking: newBooking,
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({
        message: 'Error creating booking',
        error: error.message,
      });
    }
  };

  // for admin dash
  const getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        include: [
          { model: require("../models/User"), attributes: ["username", "email"] },
          { model: require("../models/Gym"), attributes: ["gymName"] }
        ],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Error fetching bookings" });
    }
  };
  module.exports = { createBooking , getAllBookings };