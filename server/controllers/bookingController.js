const Booking = require('../models/Booking'); 

// إضافة حجز جديد
   const createBooking = async (req, res) => {
    const { name, email, phone, bookingDate, selectedPlan, paymentDetails, gym_id, user_id, type } = req.body;
    
    try {
      const newBooking = await Booking.create({
        name,
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

  module.exports = { createBooking };