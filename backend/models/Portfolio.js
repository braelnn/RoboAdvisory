const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure it's required
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  riskLevel: { type: String, enum: ["Low", "Medium", "High"], required: true },
  allocations: { type: Object, default: {} }, // Stores asset allocations
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }], // Link to reports
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
