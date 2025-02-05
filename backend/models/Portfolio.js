const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  initialInvestment: { type: Number, required: true },
  riskLevel: { type: String, required: true },
  returns: { type: Number, default: 0 }, // Add a default returns field
  goals: { type: String },
  history: [
    {
      date: { type: String, required: true }, // Ensure date is required
      value: { type: Number, required: true }, // Ensure value is required
      riskLevel: { type: String, required: true }, // Ensure risk level is required
    },
  ],
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
