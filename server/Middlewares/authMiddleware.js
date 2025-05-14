const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

function verifyToken(req, res, next) {
  const token = req.cookies.token 

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("Decoded Token:", decoded);

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;

// if (decoded.role !== "admin") { 
    //     return res.status(403).json({ message: "Access denied. Admins only." });
    // }

