const express = require('express');
const router  = express.Router();
const { createBooking } = require("../controllers/bookingController");
const { getAllBookings } = require("../controllers/bookingController");
const verifyToken = require("../Middlewares/authMiddleware");
const isAdmin = require("../Middlewares/isAdmin");

router.post('/create', createBooking );

// for admin dash
router.get("/all", verifyToken, isAdmin, getAllBookings);
    
module.exports = router;




