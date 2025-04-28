// controllers/commentController.js
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.getCommentsForGym = async (req, res) => {
  try {
    const gymId = req.params.gymId;
    const comments = await Comment.findAll({
      where: { gymId },
      order: [["createdAt", "DESC"]],
    });
    res.json(comments);
  } catch (err) {
    console.error("Error getting comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

exports.addComment = async (req, res) => {
  const userId = req.user.userId;
  const gymId = req.params.gymId;
  const { text, rating } = req.body;

  // console.log(req.body);

  // نجيب اليوزر من الداتابيس
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log("User from DB:", user); // ✅ راقب هذا
  console.log("Username:", user.username); // 👈 هذا لازم يعطي قيمة


  try {
    const newComment = await Comment.create({
      text,
      rating,
      gymId,
      username: user.username,
      // userId: user.userId,
      userId,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};