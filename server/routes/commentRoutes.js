// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../Middlewares/authMiddleware");

// المسارات الخاصة بالجيمات
router.get("/gyms/:gymId/comments", commentController.getCommentsForGym);
router.post("/gyms/:gymId/comments", verifyToken, commentController.addCommentForGym);

// المسارات الخاصة بالحضانات
router.get("/nurseries/:nurseryId/comments", commentController.getCommentsForNursery);
router.post("/nurseries/:nurseryId/comments", verifyToken, commentController.addCommentForNursery);

module.exports = router;
