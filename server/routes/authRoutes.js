const express = require('express');
const authRoute = express.Router();
const verifyToken = require("../Middlewares/authMiddleware");
const {register, login, logout} = require("../controllers/authController");

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.post('/logout', logout); 

authRoute.get("/check", verifyToken, (req, res) => {
    res.status(200).json({ message: "API is working" });
});
  
  module.exports = authRoute;