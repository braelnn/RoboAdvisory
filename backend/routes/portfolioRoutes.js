const express = require("express");
const {
  createPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const router = express.Router();

router.post("/", createPortfolio);
router.get("/", getPortfolios);
router.put("/:id", updatePortfolio);
router.delete("/:id", deletePortfolio);

module.exports = router;
