const db = require('../models');
const { Nursery, User, Payment } = db;

// Add new nursery
const addNursery = async (req, res) => {
  try {
    const {
      user_id,
      nurseryName,
      email,
      phone,
      address,
      services,
      additionalServices,
      description,
      openingHour,
      closingHour, 
      location,
      capacity,
      minAge,
      maxAge,
      category,
      monthlyFee
    } = req.body;


  const nurseryPhoto = req.files['nurseryPhoto'] ? req.files['nurseryPhoto'][0].filename : "default-image.jpg";

  console.log("Nursery Photoooooooo:", nurseryPhoto);


const documentFiles = req.files['documents'] || [];

    console.log("Files received:", req.files);
    console.log("Body received:", req.body);
    
    // const parsedDocuments = documentFiles.map(file => ({
    //   type: file.originalname.split('_')[0], // Extract document type from filename
    //   file: file.filename
    // }));

    if (!user_id || !nurseryName || !email || !phone || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new nursery
    const newNursery = await Nursery.create({
      user_id,
      nurseryName,
      email,
      phone,
      address,
      services: JSON.parse(services),
      additionalServices: additionalServices || '',
      description,
      nurseryPhoto,
      openingHour,
      closingHour,
      category,
      capacity: isNaN(parseInt(capacity)) ? null : parseInt(capacity),
      minAge: minAge === '' ? null : parseInt(minAge),
      maxAge: maxAge === '' ? null : parseInt(maxAge),
      location: JSON.parse(location),
      monthlyFee,
    });

    

    res.status(201).json({
      message: "Nursery registered successfully",
      nursery: newNursery,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const publishNursery = async (req, res) => {
  const { id } = req.params;

  try {
    // Update publish status
    const nursery = await Nursery.findByPk(id);
    if (!nursery) return res.status(404).json({ message: "Nursery not found" });

    nursery.isPublished = true;
    await nursery.save();

    // Update user role
    const user = await User.findOne({ where: { user_id: nursery.user_id } });
    if (user && user.role === "user") {
      user.role = "nurseryOwner";
      await user.save();
    }

    res.status(200).json({ message: "Nursery published and user promoted to nurseryOwner" });
  } catch (error) {
    console.error("Error publishing nursery:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all published nurseries
const getAllNurseries = async (req, res) => {
  try {
    const nurseries = await Nursery.findAll({ where: { isPublished: true } });
    res.json({ nurseries });
  } catch (error) {
    console.error('Error fetching nurseries:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get nursery by ID
const getNurseryById = async (req, res) => {
  const { id } = req.params;

  try {
    const nursery = await Nursery.findByPk(id);

    if (!nursery) {
      return res.status(404).json({ message: "Nursery not found" });
    }

    res.status(200).json({ nursery });
  } catch (error) {
    console.error("Error fetching nursery:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getNearestGym = async (req, res) => {
  try {
    const nurseryId = req.params.nurseryId;

    // 1. جلب بيانات الحضانة
    const nursery = await Nursery.findByPk(nurseryId);

    if (!nursery || !nursery.location || !nursery.location.lat || !nursery.location.lng) {
      return res.status(400).json({ message: "Nursery location data is missing or invalid" });
    }

    const { lat: nurseryLat, lng: nurseryLng } = nursery.location;

    // 2. جلب جميع الجيمات من قاعدة البيانات
    const allGyms = await Gym.findAll();

    if (!allGyms.length) {
      return res.status(404).json({ message: "No gyms found." });
    }

    // 3. حساب أقرب جيم
    let nearestGym = null;
    let minDistance = Infinity;

    for (const gym of allGyms) {
      if (!gym.location || !gym.location.lat || !gym.location.lng) continue;

      const gLat = gym.location.lat;
      const gLng = gym.location.lng;

      const distance = Math.sqrt(
        Math.pow(gLat - nurseryLat, 2) + Math.pow(gLng - nurseryLng, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestGym = gym;
      }
    }

    // 4. التحقق من وجود جيم صالح
    if (!nearestGym) {
      return res.status(404).json({ message: "No gym with valid location found nearby." });
    }

    // 5. إرجاع أقرب جيم
    res.status(200).json({ gym: nearestGym });

  } catch (error) {
    console.error("Error fetching nearest gym:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// for admin dash:
// Get pending nurseries 
const getPendingNurseries = async (req, res) => {
  try {
    const nurseries = await Nursery.findAll({
      where: { isPublished: false },
      include: [
        {
          model: Payment,
          as: "payment",
          required: false,
        },
        {
          model: User,
          as: "user",
        },
      ],
    });

    res.status(200).json({ nurseries });
  } catch (error) {
    console.error("Error fetching pending nurseries:", error);
    res.status(500).json({
      message: "Error loading pending nurseries",
      error: error.message,
    });
  }
};

module.exports = { 
  addNursery, 
  publishNursery, 
  getAllNurseries, 
  getNurseryById,
  getNearestGym, 
  getPendingNurseries 
};


