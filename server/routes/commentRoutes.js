// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../Middlewares/authMiddleware");
const isAdmin = require("../Middlewares/isAdmin");

// المسارات الخاصة بالجيمات
router.get("/gyms/:gymId/comments", commentController.getCommentsForGym);
router.post("/gyms/:gymId/comments", verifyToken, commentController.addCommentForGym);

// المسارات الخاصة بالحضانات
router.get("/nurseries/:nurseryId/comments", commentController.getCommentsForNursery);
router.post("/nurseries/:nurseryId/comments", verifyToken, commentController.addCommentForNursery);

// For admin dash
// عرض كل التعليقات
router.get("/comments", verifyToken, isAdmin, commentController.getAllComments);

// حذف تعليق
router.delete("/comments/:id", verifyToken, isAdmin, commentController.deleteComment);


module.exports = router;
