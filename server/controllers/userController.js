const User  = require('../models/User');
const Gym = require('../models/Gym');
const Booking = require('../models/Booking');

// جلب بيانات المستخدم أو الأونر
exports.getProfile = async (req, res) => {
  const { userId } = req.params;

    if (userId === "all") {
      const users = await User.findAll();
      return res.status(200).json(users);
    }

  try {
    const user = await User.findByPk(userId, {
      attributes: ['username', 'email', 'phone', 'address', 'profileImage', 'role']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // ممكن تضيفي شرط حسب نوع المستخدم إذا حابة
    if (user.role !== 'user' && user.role !== 'gymOwner') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
  
};


exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { phone, address, username, email } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ممكن تضيفي شرط حسب نوع المستخدم إذا حابة
    if (user.role !== 'user' && user.role !== 'gymOwner') {
      return res.status(403).json({ message: 'Access denied' });
    }

    user.phone = phone;
    user.address = address;
    user.username = username;
    user.email = email;

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// عرض الحجوزات الخاصة بجيمات يملكها صاحب الجيم
exports.getOwnerBookings = async (req, res) => {
  const { ownerId } = req.params;

  try {
    // جلب كل الجيمات التي يملكها هذا الـ Owner
    const gyms = await Gym.findAll({ where: { user_id: ownerId } });

    const gymIds = gyms.map((gym) => gym.id);

    // جلب الحجوزات المرتبطة بهذه الجيمات
    const bookings = await Booking.findAll({
      where: { gym_id: gymIds },
      include: [
        { model: User, attributes: ['username', 'email'] },
        { model: Gym, attributes: ['gymName'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching owner bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};



exports.updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findByPk(bookingId, {
      include: [
        { model: User, attributes: ['username', 'email'] },
        { model: Gym, attributes: ['gymName'] }
      ]
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = status;
    await booking.save();

    res.json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Failed to update booking status', error });
  }
};



//for admin dash
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'username', 'email', 'phone', 'role', 'verified', 'profileImage', 'address', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(users);
  } catch (err) {
    console.error("Failed to fetch users", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.updateRole = async (req, res) => {
//   try {
//     const { role } = req.body;
//     await User.update({ role }, { where: { user_id: req.params.user_id } });
//     res.json({ message: "Role updated successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update role" });
//   }
// };