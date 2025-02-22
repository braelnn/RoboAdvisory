const express = require("express");
const {
  createPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const authMiddleware = require("../middleware/authMiddleware"); // ✅ Import authentication middleware

const router = express.Router();

router.post("/", authMiddleware, createPortfolio);
router.get("/", authMiddleware, getPortfolios);
router.put("/:id", authMiddleware, updatePortfolio);
router.delete("/:id", authMiddleware, deletePortfolio);

module.exports = router;
