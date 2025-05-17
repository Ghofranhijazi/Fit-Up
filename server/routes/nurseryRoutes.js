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
const verifyToken = require("../Middlewares/authMiddleware");
const isAdmin = require("../Middlewares/isAdmin");

// Add new nursery
nurseryRoutes.post(
  '/add-nursery',
  upload.fields([
    { name: 'nurseryPhoto', maxCount: 1 }
    // { name: 'documents' }
  ]),
  addNursery
);

// Get all published nurseries
nurseryRoutes.get('/all', getAllNurseries);

// For admin dash 
// Get pending nurseries
nurseryRoutes.get('/pending',verifyToken, isAdmin, getPendingNurseries);

// For admin dash 
// Publish nursery
nurseryRoutes.patch('/publish-nursery/:id',verifyToken, isAdmin, publishNursery);

// إضافة مسار لعرض أقرب جيم
nurseryRoutes.get("/:nurseryId/nearest-gym", getNearestGym);

// Get nursery by ID
nurseryRoutes.get('/:id', getNurseryById);

module.exports = nurseryRoutes;

