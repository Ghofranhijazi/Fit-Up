const Booking = require('../models/Booking'); 
const User  = require('../models/User');
const Gym = require('../models/Gym');
const Nursery = require('../models/Nursery');
const Joi = require("joi"); 



const createBooking = async (req, res) => {
  const { username, email, phone, bookingDate, selectedPlan, paymentDetails, gym_id, nursery_id, user_id, type } = req.body;


  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),
   phone: Joi.string()
  .pattern(/^07[0-9]{8}$/)
  .required()
  .messages({
    "string.pattern.base": "Phone number must be 10 digits and start with 07",
    "string.empty": "Phone is required"
  }),
    bookingDate: Joi.date()
    .iso()
    .min('now')  
    .required()
    .messages({
      "date.base": "Booking date must be a valid ISO date",
      "date.min": "Booking date cannot be in the past",
      "any.required": "Booking date is required"
    }),
  }).unknown(true);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    let finalPrice = null;

    if (type === "gym") {
      finalPrice = selectedPlan;
    } else if (type === "nursery") {
      const nursery = await Nursery.findByPk(nursery_id);
      if (!nursery) {
        return res.status(404).json({ message: "Nursery not found" });
      }
      finalPrice = nursery.monthlyFee || "0";
    }

    const newBooking = await Booking.create({
      username,
      email,
      phone,
      bookingDate,
      selectedPlan: finalPrice,
      paymentDetails: JSON.stringify(paymentDetails),
      paymentStatus: 'completed',
      status: 'pending',
      gym_id: type === "gym" ? gym_id : null,
      nursery_id: type === "nursery" ? nursery_id : null,
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
     { model: User, as: "user", attributes: ["username", "email"] },  
     { model: Gym, as: "gym", attributes: ["gymName"] }, 
     { model: Nursery, as: "nursery", attributes: ['nurseryName'] } 
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