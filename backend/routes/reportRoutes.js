const express = require('express');
const router = express.Router();
const { getPortfolioReports, createPortfolioReport, getReportsByPortfolio } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Debugging logs
console.log("authMiddleware:", typeof authMiddleware); 
console.log("getPortfolioReports:", typeof getPortfolioReports);
console.log("createPortfolioReport:", typeof createPortfolioReport);
console.log("getReportsByPortfolio:", typeof getReportsByPortfolio);


if (typeof authMiddleware !== 'function') {
    throw new Error("authMiddleware is not a function. Check authMiddleware.js");
}
if (typeof getReportsByPortfolio !== 'function') {
    throw new Error("getReportsByPortfolio is not a function. Check reportController.js");
}

if (typeof createPortfolioReport !== 'function') {
    throw new Error("createPortfolioReport is not a function. Check reportController.js");
}

// ✅ Define routes
router.get('/:portfolioId', authMiddleware, getPortfolioReports);
router.post('/:portfolioId', authMiddleware, createPortfolioReport);
router.get("/:portfolioId", authMiddleware, getReportsByPortfolio);


module.exports = router;
