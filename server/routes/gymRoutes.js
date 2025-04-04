const express = require('express');
const gymRoutes = express.Router();
const { addGym, publishGym, getAllGyms, getGymById, getGymPlans } = require("../controllers/gymController");
const upload = require('../Middlewares/upload');

gymRoutes.post(
    '/add-gym',
    upload.fields([
      { name: 'gymPhoto', maxCount: 1 },
      { name: 'trainerPhotos' } 
    ]),
    addGym
  );

  gymRoutes.patch(
    '/publish-gym/:id',
     publishGym);


  gymRoutes.get('/all', getAllGyms); 

  // ✅ هذا هو الراوت الجديد لعرض تفاصيل الجيم
  gymRoutes.get("/:id", getGymById);

  gymRoutes.get("/:id/plans", getGymPlans);


module.exports = gymRoutes;



