require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

// Middleware لتحليل JSON
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies)
  })
);

// Routes
app.use('/api/auth', authRoutes);

// الاتصال بقاعدة البيانات
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.error("MongoDB Connection Error:", err));

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
