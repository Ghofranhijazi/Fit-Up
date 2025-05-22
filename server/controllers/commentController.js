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
      where: {
        gymId,
        isDeleted: false  // ✅ تجاهل التعليقات المحذوفة
      },
      
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

  
  const gym = await Gym.findByPk(gymId);
  if (!gym) {
    return res.status(404).json({ message: "Gym not found" });
  }


  if (req.body.nurseryId) {
    return res.status(400).json({ message: "Cannot send both gymId and nurseryId in the same request." });
  }

  
  const existingBooking = await Booking.findOne({
    where: {
       user_id: userId,      
       gym_id: gymId,    
      paymentStatus: 'completed'
    }
  });

  if (!existingBooking) {
    return res.status(403).json({ message: "You can only comment if you have a completed booking for this gym." });
  }



  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }


  if (req.body.nurseryId) {
    return res.status(400).json({ message: "NurseryId should not be provided for gym comments." });
  }

  console.log("User from DB:", user); 
  console.log("Username:", user.username); 


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


exports.getCommentsForNursery = async (req, res) => {
  try {
    const nurseryId = req.params.nurseryId;
    const comments = await Comment.findAll({
     where: {
        nurseryId,
        isDeleted: false  // ✅ فلتر عشان ما تظهر المحذوفة
      },
      
      order: [["createdAt", "DESC"]],
    });
    res.json(comments);
  } catch (err) {
    console.error("Error getting comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};


exports.addCommentForNursery = async (req, res) => {
  const userId = req.user.userId;
  const nurseryId = req.params.nurseryId;
  const { text, rating } = req.body;

 
  const nursery = await Nursery.findByPk(nurseryId);
  if (!nursery) {
    return res.status(404).json({ message: "Nursery not found" });
  }

  
   if (req.body.gymId) {
    return res.status(400).json({ message: "Cannot send both gymId and nurseryId in the same request." });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

   
   if (req.body.gymId) {
    return res.status(400).json({ message: "GymId should not be provided for nursery comments." });
  }

   
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
