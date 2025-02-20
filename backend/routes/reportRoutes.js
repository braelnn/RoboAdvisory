const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // ✅ Ensure correct import
const { getPortfolioReports, createPortfolioReport } = require('../controllers/reportController'); // ✅ Ensure correct import

// ✅ Debugging logs
console.log("authMiddleware:", typeof authMiddleware); 
console.log("getPortfolioReports:", typeof getPortfolioReports);
console.log("createPortfolioReport:", typeof createPortfolioReport);

if (typeof authMiddleware !== 'function') {
    throw new Error("authMiddleware is not a function. Check authMiddleware.js");
}
if (typeof getPortfolioReports !== 'function') {
    throw new Error("getPortfolioReports is not a function. Check reportController.js");
}
if (typeof createPortfolioReport !== 'function') {
    throw new Error("createPortfolioReport is not a function. Check reportController.js");
}

// ✅ Define routes
router.get('/:portfolioId', authMiddleware, getPortfolioReports);
router.post('/:portfolioId', authMiddleware, createPortfolioReport);

module.exports = router;
