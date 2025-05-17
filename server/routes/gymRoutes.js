const express = require('express');
const gymRoutes = express.Router();
const { addGym, publishGym, getAllGyms, getGymById, getGymPlans, getPendingGyms, getNearestNursery, getTopRatedGyms, getRandomGyms } = require("../controllers/gymController");
const upload = require('../Middlewares/upload');
const verifyToken = require("../Middlewares/authMiddleware");
const isAdmin = require("../Middlewares/isAdmin");

// ✅ إضافة جيم
gymRoutes.post(
  '/add-gym',
  upload.fields([
    { name: 'gymPhoto', maxCount: 1 },
    { name: 'trainerPhotos' }
  ]),
  addGym
);

// ✅ عرض جميع الجيمات المنشورة
gymRoutes.get('/all', getAllGyms);

//For admin dash
// ✅ عرض الجيمات التي تنتظر موافقة (pending)
gymRoutes.get('/pending', verifyToken, isAdmin, getPendingGyms);

//For admin dash
// ✅ نشر الجيم والموافقة عليه
gymRoutes.patch('/publish-gym/:id', verifyToken, isAdmin, publishGym);

// ✅ جلب خطط الاشتراك (خطط الجيم)
gymRoutes.get('/:id/plans', getGymPlans);

// Route to get nearest nursery based on gym location
gymRoutes.get("/:gymId/nearest-nursery", getNearestNursery);

// For Home
gymRoutes.get("/top-rated-gyms", getTopRatedGyms);
// gymRoutes.js
gymRoutes.get("/random", getRandomGyms);

// ✅ جلب تفاصيل جيم واحد
gymRoutes.get('/:id', getGymById);



module.exports = gymRoutes;


