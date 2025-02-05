const express = require('express');
const Portfolio = require('../models/Portfolio');
const router = express.Router();

// Get all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving portfolios' });
  }
});

// Create a new portfolio
router.post('/', async (req, res) => {
  try {
    const { name, initialInvestment, riskLevel, goals, history } = req.body;

    if (!name || !initialInvestment || !riskLevel) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Calculate returns (example: 10% of the initial investment)
    const returns = parseFloat(initialInvestment) * 0.1;

    const newPortfolio = new Portfolio({
      name,
      initialInvestment: parseFloat(initialInvestment),
      riskLevel,
      goals,
      returns, // Include returns calculation
      history: history || [],
    });
    
    // Save the portfolio to the database
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (err) {
    console.error('Error creating portfolio:', err.message, err.stack);
    if (err.code === 11000) {
      // Handle MongoDB unique index error
      res.status(400).json({ message: 'Portfolio name must be unique.' });
    } else {
      res.status(500).json({ message: 'Failed to create portfolio.' });
    }
  }
});

// Delete a portfolio
router.delete('/:id', async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.status(200).json({ message: 'Portfolio deleted' });
  } catch (err) {
    console.error('Error deleting portfolio:', err);
    res.status(500).json({ message: 'Error deleting portfolio' });
  }
});

// Update a portfolio
router.put('/:id', async (req, res) => {
  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the updated document
    );
    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.status(200).json(updatedPortfolio);
  } catch (err) {
    console.error('Error updating portfolio:', err);
    res.status(500).json({ message: 'Failed to update portfolio.' });
  }
});

// Add history data to a portfolio
// Add history to a portfolio
router.put('/:id/history', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    // Append new history data
    portfolio.history = [...(portfolio.history || []), ...req.body];
    const updatedPortfolio = await portfolio.save();
    res.status(200).json(updatedPortfolio);
  } catch (err) {
    console.error('Error adding portfolio history:', err);
    res.status(500).json({ message: 'Failed to add portfolio history.' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.status(200).json(portfolio);
  } catch (err) {
    console.error('Error fetching portfolio:', err);
    res.status(500).json({ message: 'Failed to fetch portfolio.' });
  }
});


module.exports = router;
