// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../Middlewares/authMiddleware");

router.get("/gyms/:gymId/comments", commentController.getCommentsForGym);
router.post("/gyms/:gymId/comments", verifyToken, commentController.addComment);

module.exports = router;
