const express = require('express');
const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, phone, subject, message } = req.body;

  if (!name || !phone || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Simulate sending the message to the admin's phone number
    const adminPhone = '+254799714455'; // Replace with the admin's phone number
    console.log(`New message for admin (${adminPhone}):`);
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    res.status(200).json({ message: 'Your message has been sent to the admin.' });
  } catch (error) {
    console.error('Error processing contact message:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
