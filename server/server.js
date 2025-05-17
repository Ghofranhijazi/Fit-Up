require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser");

const { sequelize } = require("./config/database");
// Routes
const authRoutes = require('./routes/authRoutes');
const gymRoutes = require('./routes/gymRoutes');
const nurseryRoutes = require('./routes/nurseryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require("./routes/commentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoutes = require('./routes/contact');

const PORT = process.env.PORT || 5000;
const app = express();

const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware لتحليل JSON
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: '*',  // Allow any origin (for testing)
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies)
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use('/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
  console.error("Error in file upload:", err);
  res.status(500).json({ message: "File upload failed", error: err.message });
});




// الاتصال بقاعدة البيانات
sequelize
   .sync({ alter: true  })
   .then(() => console.log("✅ PostgreSQL Connected Successfully"))
   .catch((err) => console.log("❌ PostgreSQL Connection Failed:", err));


app.use('/api/auth', authRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/nurseries', nurseryRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api', userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/contact', contactRoutes);


// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`⭐ Server is running on port ${PORT}`);
});

