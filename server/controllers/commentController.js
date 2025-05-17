// controllers/commentController.js
const Comment = require("../models/Comment");
const User = require("../models/User");
const Nursery = require("../models/Nursery");
const Gym = require("../models/Gym");
const Booking = require("../models/Booking");

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

exports.addCommentForGym = async (req, res) => {
  const userId = req.user.userId;
  const gymId = req.params.gymId;
  const { text, rating } = req.body;

  // تحقق من وجود الجيم
  const gym = await Gym.findByPk(gymId);
  if (!gym) {
    return res.status(404).json({ message: "Gym not found" });
  }

  // تحقق إذا كان الطلب يحتوي على gymId و nurseryId في نفس الوقت
  if (req.body.nurseryId) {
    return res.status(400).json({ message: "Cannot send both gymId and nurseryId in the same request." });
  }

   // التحقق من وجود حجز مكتمل الدفع للحضانة لهذا المستخدم
  const existingBooking = await Booking.findOne({
    where: {
       user_id: userId,      // ✅ استخدم اسم العمود الفعلي في قاعدة البيانات
       gym_id: gymId,    
      paymentStatus: 'completed'
    }
  });

  if (!existingBooking) {
    return res.status(403).json({ message: "You can only comment if you have a completed booking for this gym." });
  }


  // نجيب اليوزر من الداتابيس
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // تحقق من أن التعليق يحتوي فقط على gymId أو nurseryId، ولكن ليس كلاهما
  if (req.body.nurseryId) {
    return res.status(400).json({ message: "NurseryId should not be provided for gym comments." });
  }

  console.log("User from DB:", user); // ✅ راقب هذا
  console.log("Username:", user.username); // 👈 هذا لازم يعطي قيمة


  try {
    const newComment = await Comment.create({
      text,
      rating,
      gymId,
      username: user.username,
      userId,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// دالة لعرض تعليقات الحضانة
exports.getCommentsForNursery = async (req, res) => {
  try {
    const nurseryId = req.params.nurseryId;
    const comments = await Comment.findAll({
      where: { nurseryId },
      order: [["createdAt", "DESC"]],
    });
    res.json(comments);
  } catch (err) {
    console.error("Error getting comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// دالة لإضافة تعليق على الحضانة
exports.addCommentForNursery = async (req, res) => {
  const userId = req.user.userId;
  const nurseryId = req.params.nurseryId;
  const { text, rating } = req.body;

  // تحقق من وجود الحضانة
  const nursery = await Nursery.findByPk(nurseryId);
  if (!nursery) {
    return res.status(404).json({ message: "Nursery not found" });
  }

   // تحقق إذا كان الطلب يحتوي على gymId و nurseryId في نفس الوقت
   if (req.body.gymId) {
    return res.status(400).json({ message: "Cannot send both gymId and nurseryId in the same request." });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

   // تحقق من أن التعليق يحتوي فقط على nurseryId أو gymId، ولكن ليس كلاهما
   if (req.body.gymId) {
    return res.status(400).json({ message: "GymId should not be provided for nursery comments." });
  }

   // التحقق من وجود حجز مكتمل الدفع للحضانة لهذا المستخدم
  const existingBooking = await Booking.findOne({
    where: {
      user_id: userId,
      nursery_id: nurseryId,
      paymentStatus: 'completed'
    }
  });

  if (!existingBooking) {
    return res.status(403).json({ message: "You can only comment if you have a completed booking for this nursery." });
  }

  try {
    const newComment = await Comment.create({
      text,
      rating,
      nurseryId,
      username: user.username,
      userId,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// For admin dash
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
    isDeleted: false
    },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching all comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};


exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.isDeleted = true;
    await comment.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
