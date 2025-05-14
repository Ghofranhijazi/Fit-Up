const db = require('../models');
const { Gym, User, Payment, Nursery } = db;

// إضافة جيم جديد
const addGym = async (req, res) => {
  try {
    // Parse JSON strings to objects/arrays BEFORE any checks
    const location = req.body.location ? JSON.parse(req.body.location) : {};
    const plans = req.body.plans ? JSON.parse(req.body.plans) : [];
    const trainers = req.body.trainers ? JSON.parse(req.body.trainers) : [];

    // Then destructure the rest
    const {
      user_id,
      gymName,
      email,
      phone,
      address,
      description,
      openingHour,
      closingHour,
      category
    } = req.body;

    const hasIndoorNursery = req.body.hasIndoorNursery === "true" || req.body.hasIndoorNursery === true ? true : false; 

    // File handling
    const gymPhoto = req.files?.gymPhoto?.[0]?.filename || null;
    const trainerImages = req.files?.trainerPhotos || [];

    const parsedTrainers = trainers.map((trainer, index) => ({
      ...trainer,
      photo: trainer.photo ? trainerImages[index]?.filename : null,
    }));

    if (!user_id || !gymName || !email || !phone || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    console.log("📦 Gym Data@@@@@:", {
      user_id,
      gymName,
      email,
      phone,
      address,
      hasIndoorNursery,
      description,
      gymPhoto,
      openingHour,
      closingHour,
      category,
      location,
      plans,
      trainers: parsedTrainers,
    });
    
    const newGym = await Gym.create({
      user_id,
      gymName,
      email,
      phone,
      address,
      hasIndoorNursery,
      description,
      gymPhoto,
      openingHour,
      closingHour,
      category,
      location,
      plans,
      trainers: parsedTrainers,
    });

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
    console.log('Gym data backenddd:', gym);  // Debug here
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

// Controller to get the nearest nursery based on gym location
const getNearestNursery = async (req, res) => {
  try {
    const gymId = req.params.gymId;

    // 1. جلب بيانات الجيم
    const gym = await Gym.findByPk(gymId);

    if (!gym || !gym.location || !gym.location.lat || !gym.location.lng) {
      return res.status(400).json({ message: "Gym location data is missing or invalid" });
    }

    const { lat: gymLat, lng: gymLng } = gym.location;

    // 2. جلب جميع الحضانات من قاعدة البيانات
    const allNurseries = await Nursery.findAll();

    if (!allNurseries.length) {
      return res.status(404).json({ message: "No nurseries found." });
    }

    // 3. حساب أقرب حضانة
    let nearestNursery = null;
    let minDistance = Infinity;

    for (const nursery of allNurseries) {
      if (!nursery.location || !nursery.location.lat || !nursery.location.lng) continue;

      const nLat = nursery.location.lat;
      const nLng = nursery.location.lng;

      const distance = Math.sqrt(
        Math.pow(nLat - gymLat, 2) + Math.pow(nLng - gymLng, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestNursery = nursery;
      }
    }

    // 4. التحقق من وجود حضانة صالحة
    if (!nearestNursery) {
      return res.status(404).json({ message: "No nursery with valid location found nearby." });
    }

    // 5. إرجاع أقرب حضانة
    res.status(200).json({ nursery: nearestNursery });

  } catch (error) {
    console.error("Error fetching nearest nursery:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// for admin dash
const getPendingGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll({
      // where: { isPublished: false },
      include: [
        { model: Payment,
          as: "payment",
          required: false,  // هذا يتيح أن تكون المدفوعات غير مرتبطة بالجيم
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


module.exports = { addGym, publishGym, getAllGyms, getGymById, getGymPlans, getPendingGyms, getNearestNursery };


// const db = require('../models');
// const { Gym, User, Payment } = db;




// // إضافة جيم جديد
// const addGym = async (req, res) => {
//   try {

//     console.log("Received location:", req.body.location);
//     console.log("Received plans:", req.body.plans);
//     console.log("Received trainers:", req.body.trainers);
//     console.log("Received gymName:", req.body.gymName);
//     console.log("Received email:", req.body.email);
//     console.log("Received address:", req.body.address);
//     console.log("Received description:", req.body.description);
//     console.log("Received user_id:", req.body.user_id);
//     console.log("Received phone:", req.body.phone);
//     console.log("closingHour:", req.body.closingHour);
//     console.log("openingHour:", req.body.openingHour);
//     console.log("category:", req.body.category);


//     const {
//       user_id,
//       gymName,
//       email,
//       phone,
//       address,
//       hasIndoorNursery,
//       description,
//       openingHour,
//       closingHour,
//       location,
//       plans,
//       trainers,
//       category,
//     } = req.body;

//     const gymPhoto = req.files['gymPhoto'] ? req.files['gymPhoto'][0].filename : null;
//     const trainerImages = req.files['trainerPhotos'] || [];

//     console.log("Files received:", req.files);
//     console.log("Body received:", req.body);
    
//     const parsedTrainers = JSON.parse(req.body.trainers).map((trainer, index) => ({
//      ...trainer,
//      photo: trainer.photo ? trainerImages[index]?.filename : null
//     }));

    
//         if (!user_id || !gymName || !email || !phone || !address) {
//           return res.status(400).json({ message: "Missing required fields" });
//         }

//     // إنشاء الجيم الجديد
//     const newGym = await Gym.create({
//       user_id,
//       gymName,
//       email,
//       phone,
//       address,
//       hasIndoorNursery: hasIndoorNursery, // directly use the boolean value
//       description,
//       gymPhoto,
//       openingHour,
//       closingHour,
//       category,
//       location: JSON.parse(location),
//       plans: JSON.parse(plans),
//       trainers: parsedTrainers,
//     });

//     console.log("gym dataaaa" + newGym)

//     res.status(201).json({
//       message: "Gym registered successfully",
//       gym: newGym,
//     });
//   } catch (error) {
//     console.error("Erroooor:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const publishGym = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // تحديث حالة النشر
//     const gym = await Gym.findByPk(id);
//     if (!gym) return res.status(404).json({ message: "Gym not found" });

//     gym.isPublished = true;
//     await gym.save();

//     // تحديث دور المستخدم المرتبط بهذا الجيم
//     const user = await User.findOne({ where: { user_id: gym.user_id } });
//     console.log("User found:", user);
//     if (user && user.role === "user") {
//       user.role = "gymOwner";
//       await user.save();
//     }

//     res.status(200).json({ message: "Gym published and user promoted to gymOwner" });
//   } catch (error) {
//     console.error("Error publishing gym:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Controller function for getting all gyms
// const getAllGyms = async (req, res) => {
//   try {
//     const gyms = await Gym.findAll({ where : { isPublished : true } });
//     res.json({ gyms }); // Ensure you're sending the data as { gyms: [...] }
//   } catch (error) {
//     console.error('Error fetching gyms:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const getGymById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const gym = await Gym.findByPk(id);

//     if (!gym) {
//       return res.status(404).json({ message: "Gym not found" });
//     }

//     res.status(200).json({ gym });
//   } catch (error) {
//     console.error("Error fetching gym:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// };


// const getGymPlans = async (req, res) => {
//   const { id } = req.params;
//   console.log("Received ID in Backend:", id); // ✅ افحصي القيم في السيرفر

//   if (!id) {
//     return res.status(400).json({ error: "Gym ID is required" });
//   }

//   try {
//     const gym = await Gym.findByPk(id);

//     if (!gym) {
//       return res.status(404).json({ message: "Gym not found" });
//     }

//     // التحقق من وجود خطط
//     if (!gym.plans || gym.plans.length === 0) {
//       return res.status(200).json([]);
//     }

//    // إرجاع الخطط كـ JSON
//    res.status(200).json(gym.plans || []);
//   } catch (error) {
//     console.error("Error fetching gym plans:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const getPendingGyms = async (req, res) => {
//   try {
//     const gyms = await Gym.findAll({
//       where: { isPublished: false },
//       include: [
//         {
//           model: Payment,
//           as: "payment",
//         },
//         {
//           model: User,
//           as: "user",
//         },
//       ],
//     });

//     res.status(200).json({ gyms });
//   } catch (error) {
//     console.error("Error fetching pending gyms:", error);
//     res.status(500).json({
//       message: "Error loading pending gyms",
//       error: error.message,
//     });
//   }
// };


// module.exports = { addGym, publishGym, getAllGyms, getGymById, getGymPlans, getPendingGyms };