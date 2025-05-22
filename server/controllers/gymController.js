const db = require('../models');
const { Gym, User, Payment, Nursery, Comment } = db;
const Joi = require('joi');

const addGym = async (req, res) => {
  try {
    const location = req.body.location ? JSON.parse(req.body.location) : {};
    const plans = req.body.plans ? JSON.parse(req.body.plans) : [];
    const trainers = req.body.trainers ? JSON.parse(req.body.trainers) : [];

    const {
      user_id,
      gymName,
      email,
      phone,
      address,
      description,
      services,
      additionalServices,
      openingHour,
      closingHour,
      category
    } = req.body;

    const hasIndoorNursery = req.body.hasIndoorNursery === "true" || req.body.hasIndoorNursery === true ? true : false;

    
    const schema = Joi.object({
      gymName: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Gym name is required",
        "string.min": "Gym name must be at least 3 characters"
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required"
      }),
      phone: Joi.string().pattern(/^07[0-9]{8}$/).required().messages({
        "string.pattern.base": "Phone number must be 10 digits and start with 07",
        "string.empty": "Phone is required"
      }),
      address: Joi.string().min(5).required().messages({
        "string.empty": "Address is required",
        "string.min": "Address must be at least 5 characters"
      }),
      description: Joi.string().allow('').max(1000),
      services: Joi.string().required(),
      additionalServices: Joi.string().allow(''),
      openingHour: Joi.string().pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
        "string.pattern.base": "Opening hour must be in HH:MM format (e.g., 08:00)",
        "string.empty": "Opening hour is required"
      }),
      closingHour: Joi.string().pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
        "string.pattern.base": "Closing hour must be in HH:MM format (e.g., 21:00)",
        "string.empty": "Closing hour is required"
      }),
      hasIndoorNursery: Joi.boolean().allow(''),
     }).unknown(true);

    const validationResult = schema.validate({
      user_id,
      gymName,
      email,
      phone,
      address,
      description,
      services,
      additionalServices,
      openingHour,
      closingHour,
      category,
      hasIndoorNursery
    });

    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }

    // 📸 
    const gymPhoto = req.files?.gymPhoto?.[0]?.filename || null;
    const trainerImages = req.files?.trainerPhotos || [];

    const parsedTrainers = trainers.map((trainer, index) => ({
      ...trainer,
      photo: trainer.photo ? trainerImages[index]?.filename : null,
    }));

    const newGym = await Gym.create({
      user_id,
      gymName,
      email,
      phone,
      address,
      hasIndoorNursery,
      description,
      services: JSON.parse(services),
      additionalServices: additionalServices || '',
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


// after admin approved
const publishGym = async (req, res) => {
  const { id } = req.params;

  try {
   
    const gym = await Gym.findByPk(id);
    if (!gym) return res.status(404).json({ message: "Gym not found" });

    gym.isPublished = true;
    await gym.save();

  
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

// Controller function for getting all gyms in the list
const getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll({ where : { isPublished : true } });
    res.json({ gyms });
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
    console.log('Gym data backenddd:', gym);  
    res.status(200).json({ gym });
  } catch (error) {
    console.error("Error fetching gym:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


const getGymPlans = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID in Backend:", id);

  if (!id) {
    return res.status(400).json({ error: "Gym ID is required" });
  }

  try {
    const gym = await Gym.findByPk(id);

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

   
    if (!gym.plans || gym.plans.length === 0) {
      return res.status(200).json([]);
    }

  
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

   
    const gym = await Gym.findByPk(gymId);

    if (!gym || !gym.location || !gym.location.lat || !gym.location.lng) {
      return res.status(400).json({ message: "Gym location data is missing or invalid" });
    }

    const { lat: gymLat, lng: gymLng } = gym.location;

   
    const allNurseries = await Nursery.findAll();

    if (!allNurseries.length) {
      return res.status(404).json({ message: "No nurseries found." });
    }

    // Calculate the nearest nursery
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

  
    if (!nearestNursery) {
      return res.status(404).json({ message: "No nursery with valid location found nearby." });
    }

  
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
      where: { isPublished: false },
      include: [
        { model: Payment,
          as: "payment",
          required: false,  
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

// for Home
const getTopRatedGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll({
      where: { isPublished: true },
    });

    const gymsWithRatings = await Promise.all(
      gyms.map(async (gym) => {
        const comments = await Comment.findAll({
          where: {
            gymId: gym.id,
            isDeleted: false,
          },
        });

        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = comments.length > 0 ? totalRating / comments.length : 0;

        return {
          id: gym.id,
          name: gym.gymName,
          trainers: gym.trainers || [],
          gymPhoto: gym.gymPhoto,
          averageRating: parseFloat(averageRating.toFixed(1)),
          totalComments: comments.length,
        };
      })
    );

   
    const sortedGyms = gymsWithRatings.sort((a, b) => b.averageRating - a.averageRating);

    res.json(sortedGyms.slice(0, 3)); 
  } catch (error) {
    console.error("Error fetching top gyms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRandomGyms = async (req, res) => {
  try {
    const gyms = await Gym.findAll({
      where: { isPublished: true },
      attributes: ['id', 'gymPhoto'], 
    });

    
    const gymsWithPhotos = gyms.filter(gym => !!gym.gymPhoto);


    const shuffled = gymsWithPhotos.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);

    res.json(selected);
  } catch (error) {
    console.error("Error fetching random gyms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addGym, publishGym, getAllGyms, getGymById, getGymPlans, getPendingGyms, getNearestNursery, getTopRatedGyms, getRandomGyms };


