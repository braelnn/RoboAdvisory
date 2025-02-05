const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const nodemailer = require("nodemailer");


// Middleware to verify JWT and get user details
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // DO NOT EXCLUDE PASSWORD HERE
    if (!req.user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Get User Profile**
router.get("/", authenticateUser, async (req, res) => {
    try {
      const userProfile = {
        fullname: req.user.fullname || "",
        email: req.user.email || "",
        financialGoals: req.user.financialGoals || "",
        riskTolerance: req.user.riskTolerance || "",
      };
      res.status(200).json(userProfile);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

//  Update User Profile**
router.put("/", authenticateUser, async (req, res) => {
  const { fullname, financialGoals, riskTolerance } = req.body;

  try {
    req.user.fullname = fullname || req.user.fullname;
    req.user.financialGoals = financialGoals || req.user.financialGoals;
    req.user.riskTolerance = riskTolerance || req.user.riskTolerance;

    await req.user.save();
    res.status(200).json({ message: "Profile updated successfully", user: req.user });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
});

//  Change Password**
router.post("/change-password", authenticateUser, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Fetch user again to ensure password field is available
    const user = await User.findById(req.user._id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Current password is incorrect" });

    // Hash and update the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error.message);
    res.status(500).json({ message: "Error changing password", error: error.message });
  }
});


// Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // 
  const investmentGuides = {
    "Very Low": { initialInvestment: "$5000 - $10,000", riskLevel: "Minimal", investmentGoal: "Bonds, Savings" },
    "Low": { initialInvestment: "$10,001 - $50,000", riskLevel: "Conservative", investmentGoal: "Index Funds, ETFs" },
    "Moderate": { initialInvestment: "$50,001 - $200,000", riskLevel: "Balanced", investmentGoal: "Stocks, Mutual Funds" },
    "High": { initialInvestment: "$200,000 - $500,000", riskLevel: "Aggressive", investmentGoal: "Tech Stocks, Startups" },
    "Very High": { initialInvestment: "$500,000 - $750,000", riskLevel: "Speculative", investmentGoal: "Crypto, Venture Capital" },
    "Ultra High": { initialInvestment: "$750,001 - $900,000", riskLevel: "Extreme Speculation", investmentGoal: "Private Equity, Commodities, IPOs" },
  "Elite Investor": { initialInvestment: "$900,001+", riskLevel: "High Net Worth Investing", investmentGoal: "Hedge Funds, Direct Investments, Offshore Accounts" }
  };
  
  // Send Investment Email
  router.post("/send-investment-email", authenticateUser, async (req, res) => {
    try {
      const { financialGoals, riskTolerance } = req.body;
      const email = req.body.email || req.user.email; // Use the provided email or fallback to user email
  
      if (!email || !riskTolerance || !financialGoals) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const guide = investmentGuides[riskTolerance];
      if (!guide) {
        return res.status(400).json({ message: "Invalid risk tolerance selection" });
      }
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Robo Advisory Investment Guideline Based on Your Profile",
        text: `Hello Valued Investor,  
        We are thrilled to provide you with a personalized investment guide tailored to your financial aspirations. 
        At RoboAdvisor, we believe in empowering you to make confident and informed financial decisions.


        Your Personalized Investment Strategy
        
        📌 Your Selected Financial Goal: ${financialGoals}
        💰 The best suggested Initial Investment is: ${guide.initialInvestment}
        ⚖ The Suitable Recommended Risk Level: ${guide.riskLevel}
        🎯 Suggested Investment Goal: ${guide.investmentGoal}
  
        Your financial journey is unique, and we are here to support you at every step. 
        Thoughtful planning and strategic investing can pave the way to achieving your dreams.
        
        We highly encourage you to consult with a financial advisor to fine-tune your strategy and maximize your investment potential.


        If you have any questions, our team is always ready to assist you. Let's build your financial future together! 🚀

        Best Regards,
        RoboAdvisor Team`
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Investment email sent successfully!" });
    } catch (error) {
      console.error("Error sending investment email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  });

module.exports = router;
