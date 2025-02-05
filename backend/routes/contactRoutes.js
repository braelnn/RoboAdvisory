const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


// Configure Nodemailer Transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true, // Enable logging
  debug: true,  // Enable debugging
});



// Contact Route: User Sends Message to Admin
router.post("/contact", async (req, res) => {
  const { subject, message } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extract JWT token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }

  try {
    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Admin Email
    const adminEmail = "blessingbraelly@gmail.com";

    // Email Content
    const mailOptions = {
      from: `"${user.fullname}" <${user.email}>`, // Sender's name and email
      to: adminEmail, // Admin's email address
      replyTo: user.email, // Ensure replies go to the user
      subject: `New Contact Message: ${subject}`,
      text: `From: ${user.fullname} (${user.email})\n\nMessage:\n${message}`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Your message has been sent to the admin." });
  } catch (error) {
    console.error("Error processing contact message:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
