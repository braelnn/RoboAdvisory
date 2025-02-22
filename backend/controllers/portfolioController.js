const mongoose = require("mongoose");
const Portfolio = require("../models/Portfolio");
const Notification = require("../models/Notification");
const { broadcastNotification } = require("../utils/notificationUtils"); // ✅ Import WebSocket broadcasting

// 📌 Allocation Logic
const allocateAssets = (amount, riskLevel) => {
  let allocation = {};

  if (riskLevel === "Low") {
    allocation = {
      Bonds: amount * 0.60,
      Stocks: amount * 0.30,
      RealEstate: amount * 0.10,
    };
  } else if (riskLevel === "Medium") {
    allocation = {
      Bonds: amount * 0.30,
      Stocks: amount * 0.50,
      Crypto: amount * 0.20,
    };
  } else if (riskLevel === "High") {
    allocation = {
      Stocks: amount * 0.70,
      Crypto: amount * 0.30,
    };
  }

  return allocation;
};

// 📌 Create Portfolio + Notification
exports.createPortfolio = async (req, res) => {
  try {
    const { name, amount, riskLevel } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
    }

    const allocations = allocateAssets(amount, riskLevel);

    const portfolio = new Portfolio({ 
      name, amount, riskLevel, allocations, userId: req.user.id 
    });
    
    await portfolio.save();

    // ✅ Create notification
    const notification = await Notification.create({
      title: "Portfolio Created",
      message: `Your portfolio "${portfolio.name}" has been created successfully.`,
      type: "info",
      userId: req.user.id
    });

    // ✅ Broadcast the notification
    broadcastNotification(notification);

    res.status(201).json(portfolio);
  } catch (error) {
    console.error("❌ Error creating portfolio:", error);
    res.status(500).json({ error: "Error creating portfolio" });
  }
};

// 📌 Get All Portfolios
exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Update Portfolio + Notification
exports.updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, riskLevel } = req.body;

    // ✅ Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid portfolio ID" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
    }

    // ✅ Recalculate allocations
    const allocations = allocateAssets(amount, riskLevel);

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      { name, amount, riskLevel, allocations },
      { new: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    // ✅ Create notification
    const notification = await Notification.create({
      title: "Portfolio Updated",
      message: `Your portfolio "${updatedPortfolio.name}" has been updated.`,
      type: "info",
      userId: req.user.id
    });

    // ✅ Broadcast the notification
    broadcastNotification(notification);

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error("❌ Error updating portfolio:", error);
    res.status(500).json({ error: "Error updating portfolio" });
  }
};

// 📌 Delete Portfolio + Notification
exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      console.error("❌ Missing user ID in request.");
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("❌ Invalid portfolio ID:", id);
      return res.status(400).json({ error: "Invalid portfolio ID" });
    }

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      console.error("❌ Portfolio not found with ID:", id);
      return res.status(404).json({ error: "Portfolio not found" });
    }

    // ✅ Ensure userId exists before using .toString()
    if (!portfolio.userId) {
      console.error("❌ portfolio.userId is missing:", portfolio);
      return res.status(500).json({ error: "Portfolio data is corrupted. Missing userId." });
    }

    // ✅ Check if user is authorized to delete (Only owner or admin)
    if (req.user.role !== "admin" && portfolio.userId.toString() !== req.user.id) {
      console.error("❌ Unauthorized delete attempt by user:", req.user.id);
      return res.status(403).json({ error: "Forbidden: You cannot delete this portfolio" });
    }

    await Portfolio.findByIdAndDelete(id);

    console.log("✅ Portfolio deleted successfully:", id);
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting portfolio:", error);
    res.status(500).json({ error: "Error deleting portfolio", details: error.message });
  }
};
