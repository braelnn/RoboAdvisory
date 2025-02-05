const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = 'cu8oip1r01qgljare2g0cu8oip1r01qgljare2gg';
const BASE_URL = 'https://finnhub.io/api/v1';

// Real-Time Market Data
router.get('/real-time', async (req, res) => {
  try {
    const symbols = ['AAPL', 'MSFT', 'TSLA', 'GOOGL', 'AMZN', 'NFLX', 
      'NVDA', 'META', 'INTC', 'AMD', 'BA', 'DIS',
      'V', 'JPM', 'WMT', 'PG', 'KO', 'PEP', 'XOM', 
      'CVX', 'JNJ', 'PFE', 'MRK', 'UNH'

    ];
    const allData = [];

    for (const symbol of symbols) {
      const response = await axios.get(`${BASE_URL}/quote`, {
        params: {
          symbol,
          token: API_KEY,
        },
      });

      const data = response.data;
      if (data) {
        allData.push({
          name: symbol, // Use symbol as the name
          symbol,
          image: `https://logo.clearbit.com/${symbol.toLowerCase()}.com`,
          price: data.c.toFixed(2), // Current price
          change: data.d.toFixed(2), // Change in price
          percentChange: data.dp.toFixed(2), // Percentage change
          high: data.h.toFixed(2), // High price of the day
          low: data.l.toFixed(2), // Low price of the day
          previousClose: data.pc.toFixed(2), // Previous close price
        });
      }
    }

    res.json(allData);
  } catch (error) {
    console.error('Error fetching real-time data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch real-time data' });
  }
});

// Historical Data
router.get('/historical', async (req, res) => {
  const { symbol, range } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}/stock/candle`, {
      params: {
        symbol,
        resolution: range === '1y' ? 'D' : range === '1m' ? '60' : '5', // Adjust resolution
        from: Math.floor((Date.now() - (range === '1y' ? 365 : range === '1m' ? 30 : 7) * 24 * 60 * 60 * 1000) / 1000), // Start time in UNIX timestamp
        to: Math.floor(Date.now() / 1000), // Current time in UNIX timestamp
        token: API_KEY,
      },
    });

    const { c: closePrices, v: volumes, t: timestamps } = response.data; // Extract data arrays
    if (closePrices && volumes && timestamps) {
      const formattedData = timestamps.map((timestamp, index) => ({
        date: new Date(timestamp * 1000).toISOString().split('T')[0], // Convert UNIX to date
        price: closePrices[index].toFixed(2),
        volume: volumes[index],
      }));

      res.json(formattedData);
    } else {
      res.status(404).json({ error: 'No historical data found' });
    }
  } catch (error) {
    console.error('Error fetching historical data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

// Market News
router.get('/news', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: {
        category: 'general',
        token: API_KEY,
      },
    });

    const newsData = response.data.map((news) => ({
      title: news.headline,
      summary: news.summary,
      url: news.url,
      image: news.image,
    }));

    res.json(newsData);
  } catch (error) {
    console.error('Error fetching market news:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch market news' });
  }
});

module.exports = router;
