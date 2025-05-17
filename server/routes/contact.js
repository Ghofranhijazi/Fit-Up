const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/contactus', contactController.createContact);

// راوت لجلب كل رسائل الاتصال
router.get('/allcontact', contactController.getAllContacts);

module.exports = router;
