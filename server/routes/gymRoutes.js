const express = require('express');
const gymRoutes = express.Router();
const { addGym, publishGym, getAllGyms, getGymById, getGymPlans, getPendingGyms } = require("../controllers/gymController");
const upload = require('../Middlewares/upload');

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

// ✅ عرض الجيمات التي تنتظر موافقة (pending)
gymRoutes.get('/pending', getPendingGyms);

// ✅ نشر الجيم والموافقة عليه
gymRoutes.patch('/publish-gym/:id', publishGym);

// ✅ جلب خطط الاشتراك (خطط الجيم)
gymRoutes.get('/:id/plans', getGymPlans);

// ✅ جلب تفاصيل جيم واحد
gymRoutes.get('/:id', getGymById);

module.exports = gymRoutes;
