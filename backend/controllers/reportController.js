const Report = require('../models/Report');
const Portfolio = require('../models/Portfolio');

// 📌 Get Reports for a Specific Portfolio
const getPortfolioReports = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const reports = await Report.find({ portfolioId });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reports' });
    }
};

// 📌 Create Report Based on Portfolio Data
const createPortfolioReport = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const { title, summary, value } = req.body;

        console.log(`📢 Creating report for ${portfolio.name} with data:`, req.body);

        const newReport = await Report.create({
            title,
            summary,
            value,
            portfolioId: portfolio._id
        });

        console.log(`✅ Report saved in DB:`, newReport);
        res.status(201).json(newReport);
    } catch (error) {
        console.error('❌ Error creating report:', error);
        res.status(500).json({ error: 'Server error while creating report' });
    }
};

module.exports = { getPortfolioReports, createPortfolioReport }; // ✅ Ensure correct export
