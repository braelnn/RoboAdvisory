const express = require('express');
const Portfolio = require('../models/Portfolio'); // Import Portfolio model
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();

    // KPIs
    const totalPortfolios = portfolios.length;
    const totalInvestmentValue = portfolios.reduce(
      (sum, portfolio) => sum + portfolio.initialInvestment,
      0
    );
    const totalReturns = portfolios.reduce(
      (sum, portfolio) => sum + (portfolio.returns || 0),
      0
    );
    const averageReturns = totalPortfolios > 0 ? totalReturns / totalPortfolios : 0;

    // Risk distribution
    const riskDistribution = portfolios.reduce(
      (acc, portfolio) => {
        acc[portfolio.riskLevel] = (acc[portfolio.riskLevel] || 0) + 1;
        return acc;
      },
      { low: 0, medium: 0, high: 0 }
    );

    // Historical performance data (for Line Chart)
    const performanceTrends = portfolios.map((portfolio) => ({
      name: portfolio.name,
      history: portfolio.history || [],
    }));

    // Asset Allocation (mocked data for now)
    const assetAllocation = {
      stocks: totalInvestmentValue * 0.4,
      bonds: totalInvestmentValue * 0.3,
      realEstate: totalInvestmentValue * 0.3,
    };

    // Response
    res.status(200).json({
      totalPortfolios,
      totalInvestmentValue,
      totalReturns,
      averageReturns,
      riskDistribution,
      performanceTrends,
      assetAllocation,
      portfolios, // Include full portfolio data for historical returns
    });
  } catch (err) {
    console.error('Error fetching analytics data:', err);
    res.status(500).json({ message: 'Failed to fetch analytics data.' });
  }
});

module.exports = router;
