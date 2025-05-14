const express = require('express');
const nurseryRoutes = express.Router();
const { 
  addNursery, 
  publishNursery, 
  getAllNurseries, 
  getNurseryById,
  getNearestGym, 
  getPendingNurseries 
} = require("../controllers/nurseryController");
const upload = require('../Middlewares/upload');

// Add new nursery
nurseryRoutes.post(
  '/add-nursery',
  upload.fields([
    { name: 'nurseryPhoto', maxCount: 1 },
    { name: 'documents' }
  ]),
  addNursery
);

// Get all published nurseries
nurseryRoutes.get('/all', getAllNurseries);

// Get pending nurseries
nurseryRoutes.get('/pending', getPendingNurseries);

// Publish nursery
nurseryRoutes.patch('/publish-nursery/:id', publishNursery);

// Get nursery by ID
nurseryRoutes.get('/:id', getNurseryById);

// إضافة مسار لعرض أقرب جيم
nurseryRoutes.get("/:nurseryId/nearest-gym", getNearestGym);

module.exports = nurseryRoutes;