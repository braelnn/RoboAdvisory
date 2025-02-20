const Portfolio = require("../models/Portfolio");

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

// 📌 Create Portfolio with Asset Allocation
exports.createPortfolio = async (req, res) => {
  try {
    const { name, amount, riskLevel } = req.body;
    const allocations = allocateAssets(amount, riskLevel);
    
    const portfolio = new Portfolio({ name, amount, riskLevel, allocations });
    await portfolio.save();
    
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

// 📌 Update Portfolio
exports.updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, riskLevel } = req.body;

    // Recalculate allocations
    const allocations = allocateAssets(amount, riskLevel);

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      { name, amount, riskLevel, allocations },
      { new: true }
    );

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Delete Portfolio
exports.deletePortfolio = async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Portfolio Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
