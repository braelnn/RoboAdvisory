const express = require("express");
const axios = require("axios");

const router = express.Router();

const API_KEY = "cu8oip1r01qgljare2g0cu8oip1r01qgljare2gg";
const BASE_URL = "https://finnhub.io/api/v1";

// Fetch stock price function
const getStockPrice = async (symbol) => {
  try {
    const response = await axios.get(`${BASE_URL}/quote`, {
      params: { symbol, token: API_KEY },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};

// API Route for fetching stock price
router.get("/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await getStockPrice(symbol.toUpperCase());

    if (!data) {
      return res.status(500).json({ error: "Failed to fetch stock data" });
    }

    res.json({
      symbol,
      currentPrice: data.c,
      highPrice: data.h,
      lowPrice: data.l,
      openPrice: data.o,
      previousClose: data.pc,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
