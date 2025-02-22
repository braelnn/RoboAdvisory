const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const otpStorage = {};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register new user
router.post("/register", async (req, res) => {
  const { fullname, username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user is the admin
      if (username === "admin" && email === "admin@gmail.com" && password === "admin") {
        const token = jwt.sign(
          { id: "admin", role: "admin" }, // ✅ Ensure `id` is included
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

      return res.status(200).json({
        message: "Admin logged in successfully",
        token,
        isAdmin: true,
      });
    }

    // Check if user exists with either username or email
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid username or email" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate OTP for regular users
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStorage[user.email] = otp;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Login OTP Code",
      text: `Hello Our RoboAdvisory User, Your OTP Code is: ${otp}`,
    });

    // Generate JWT token for regular users
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });

    res.status(200).json({ message: "OTP sent to your email", token });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { otp } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || otpStorage[user.email] !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Clear OTP after successful verification
    delete otpStorage[user.email];

    // Generate a long-lived JWT after successful OTP verification
    const longLivedToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "OTP verified successfully", token: longLivedToken });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
});

// Fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "fullname username email"); // Get user data
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




module.exports = router;

