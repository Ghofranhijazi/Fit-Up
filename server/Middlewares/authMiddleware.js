const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

function verifyToken(req, res, next) {
  const token = req.cookies.token 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("Decoded Tokennnnnnnnnnnnnnnnnnnnnnn:", decoded);

    req.user = decoded; 
    next();
  });
}

module.exports = verifyToken;

