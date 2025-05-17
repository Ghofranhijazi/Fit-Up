const ContactUs = require('../models/ContactUs');
const { User } = require('../models/User'); // في حال احتجت التحقق من المستخدم


exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message, user_id } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const contact = await ContactUs.create({
      name,
      email,
      subject,
      message,
      user_id: user_id || null, // optional
    });

    return res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};


exports.getAllContacts = async (req, res) => {
  try {
    const messages = await ContactUs.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to get messages' });
  }
};