const db = require('../models');
const { Gym, User, Payment } = db;




// إضافة جيم جديد
const addGym = async (req, res) => {
  try {
    const {
      user_id,
      gymName,
      email,
      phone,
      address,
      hasIndoorNursery,
      description,
      openingHour,
      closingHour,
      location,
      plans,
      trainers,
      category,
    } = req.body;

    const gymPhoto = req.files['gymPhoto'] ? req.files['gymPhoto'][0].filename : null;
    const trainerImages = req.files['trainerPhotos'] || [];

    console.log("Files received:", req.files);
    console.log("Body received:", req.body);
    
    const parsedTrainers = JSON.parse(req.body.trainers).map((trainer, index) => ({
     ...trainer,
     photo: trainer.photo ? trainerImages[index]?.filename : null
    }));

    
        if (!user_id || !gymName || !email || !phone || !address) {
          return res.status(400).json({ message: "Missing required fields" });
        }

    // إنشاء الجيم الجديد
    const newGym = await Gym.create({
      user_id,
      gymName,
      email,
      phone,
      address,
      hasIndoorNursery: hasIndoorNursery, // directly use the boolean value
      description,
      gymPhoto,
      openingHour,
      closingHour,
      category,
      location: JSON.parse(location),
      plans: JSON.parse(plans),
      trainers: parsedTrainers,
    });

    console.log("gym dataaaa" + newGym)

    res.status(201).json({
      message: "Gym registered successfully",
      gym: newGym,
    });
  } catch (error) {
    console.error("Erroooor:", error);
    res.status(500).json({ error: error.message });
  }
};

const publishGym = async (req, res) => {
  const { id } = req.params;

  try {
    // تحديث حالة النشر
    const gym = await Gym.findByPk(id);
    if (!gym) return res.status(404).json({ message: "Gym not found" });

    gym.isPublished = true;
    await gym.save();

    // تحديث دور المستخدم المرتبط بهذا الجيم
    const user = await User.findOne({ where: { user_id: gym.user_id } });
    console.log("User found:", user);
    if (user && user.role === "user") {
      user.role = "gymOwner";
      await user.save();
    }

    res.status(200).json({ message: "Gym published and user promoted to gymOwner" });
  } catch (error) {
    console.error("Error publishing gym:", error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function for getting all gyms
const getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll({ where : { isPublished : true } });
    res.json({ gyms }); // Ensure you're sending the data as { gyms: [...] }
  } catch (error) {
    console.error('Error fetching gyms:', error);
    res.status(500).json({ error: error.message });
  }
};

const getGymById = async (req, res) => {
  const { id } = req.params;

  try {
    const gym = await Gym.findByPk(id);

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    res.status(200).json({ gym });
  } catch (error) {
    console.error("Error fetching gym:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


const getGymPlans = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID in Backend:", id); // ✅ افحصي القيم في السيرفر

  if (!id) {
    return res.status(400).json({ error: "Gym ID is required" });
  }

  try {
    const gym = await Gym.findByPk(id);

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    // التحقق من وجود خطط
    if (!gym.plans || gym.plans.length === 0) {
      return res.status(200).json([]);
    }

   // إرجاع الخطط كـ JSON
   res.status(200).json(gym.plans || []);
  } catch (error) {
    console.error("Error fetching gym plans:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPendingGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll({
      where: { isPublished: false },
      include: [
        {
          model: Payment,
          as: "payment",
        },
        {
          model: User,
          as: "user",
        },
      ],
    });

    res.status(200).json({ gyms });
  } catch (error) {
    console.error("Error fetching pending gyms:", error);
    res.status(500).json({
      message: "Error loading pending gyms",
      error: error.message,
    });
  }
};


module.exports = { addGym, publishGym, getAllGyms, getGymById, getGymPlans, getPendingGyms };