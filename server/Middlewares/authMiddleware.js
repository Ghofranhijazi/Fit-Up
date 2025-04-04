// const jwt = require('jsonwebtoken');

// const verifyToken = async (req, res, next) => {
//     let token;

//     // Get token from cookies
//     token = req.cookies?.token;
//     console.log("Token from cookies:", req.cookies?.token);
//     console.log("Decoded user:", req.user);  // Ensure user is attached to the request

//     if (token) {
//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findByPk(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     } else {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

// module.exports = { verifyToken };

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (decoded.role !== "admin") { 
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
