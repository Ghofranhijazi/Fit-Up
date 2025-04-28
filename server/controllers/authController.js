const  User  = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const register = async (req, res) => {
  const { username, email, password } = req.body; 
  console.log("body", JSON.stringify(req.body, null, 2));

  // التحقق من البيانات المدخلة
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields (username, email, password)" });
  }

  try {
    
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
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
      process.env.JWT_SECRET,
      // { expiresIn: "0" }
    );

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
      sameSite: "lax",   // ✅ ضروري للمطابقة مع logout
      path: "/",         // ✅ تحديد المسار
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.user_id,
    });
  } catch (error) {
    console.error("erroooooooor"+ error + " Email: ", email );
    console.error(req.body);
    console.error("User model:", User);
    return res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("401--->> " + password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
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
      // { expiresIn: "0" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
      sameSite: "lax",   // ✅ ضروري للمطابقة مع logout
      path: "/",         // ✅ تحديد المسار
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
  path: "/",  // ✅ ضروري للمطابقة مع login
});
  res.json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };








