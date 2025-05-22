const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Joi = require("joi");  
dotenv.config();

const register = async (req, res) => {
  const { username, email, password } = req.body;


  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),
   password: Joi.string()
  .min(6)
  .pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d).+$"))
  .required()
  .messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
    "string.pattern.base": "Password must contain at least one uppercase letter and one number"
  })
   }).unknown(true);

  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "User already Registration" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
      verified: false,
    });

    const token = jwt.sign(
      {
        userId: newUser.user_id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
      sameSite: "lax",
      path: "/",
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.user_id,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Please log in first"});
    }

    console.log("401--->> " + password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    

    if (!isMatch) {
      return res.status(401).json({ message: "The password is incorrect."});
    }
    console.log(user.user_id);

    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        username: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
      sameSite: "lax",   
      path: "/",      
    });

    return res.status(200).json({
      message: "Login successful",
      userId: user.user_id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("erroooooooor"+ error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
  httpOnly: true,
  sameSite: "lax",
  path: "/", 
});
  res.json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };








