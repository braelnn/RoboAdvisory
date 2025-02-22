const express = require('express');
const axios = require('axios');
const router = express.Router();
const Notification = require('../models/Notification'); // Import Notification model
const { broadcastNotification } = require('../utils/notificationUtils'); // Helper for WebSocket

const API_KEY = 'cu8oip1r01qgljare2g0cu8oip1r01qgljare2gg';
const BASE_URL = 'https://finnhub.io/api/v1';

// ✅ Real-Time Market Data (with Notifications)
router.get('/real-time', async (req, res) => {
  try {
    const symbols = [
      'AAPL', 'MSFT', 'TSLA', 'GOOGL', 'AMZN', 'NFLX', 'NVDA', 'META', 'INTC', 'AMD', 
      'BA', 'DIS', 'V', 'JPM', 'WMT', 'PG', 'KO', 'PEP', 'XOM', 'CVX', 'JNJ', 'PFE', 
      'MRK', 'UNH'
    ];
    
    const allData = [];
    const notifications = [];

    for (const symbol of symbols) {
      const response = await axios.get(`${BASE_URL}/quote`, {
        params: { symbol, token: API_KEY },
      });

      const data = response.data;
      if (data) {
        const percentChange = data.dp.toFixed(2); // Percentage change

        allData.push({
          name: symbol,
          symbol,
          image: `https://logo.clearbit.com/${symbol.toLowerCase()}.com`,
          price: data.c.toFixed(2),
          change: data.d.toFixed(2),
          percentChange,
          high: data.h.toFixed(2),
          low: data.l.toFixed(2),
          previousClose: data.pc.toFixed(2),
        });

        // ✅ Send a notification if price change exceeds 2%
        if (Math.abs(percentChange) > 2) {
          const notification = await Notification.create({
            title: `Market Alert: ${symbol}`,
            message: `${symbol} stock changed by ${percentChange}% today.`,
            type: "alert",
          });

          // ✅ Collect notifications for bulk broadcasting
          notifications.push(notification);
        }
      }
    }

    // ✅ Broadcast all notifications at once
    notifications.forEach(broadcastNotification);

    res.json(allData);
  } catch (error) {
    console.error('❌ Error fetching real-time data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch real-time data' });
  }
});

// ✅ Fetch Historical Data
router.get('/historical', async (req, res) => {
  const { symbol, range } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}/stock/candle`, {
      params: {
        symbol,
        resolution: range === '1y' ? 'D' : range === '1m' ? '60' : '5',
        from: Math.floor((Date.now() - (range === '1y' ? 365 : range === '1m' ? 30 : 7) * 24 * 60 * 60 * 1000) / 1000),
        to: Math.floor(Date.now() / 1000),
        token: API_KEY,
      },
    });

    const { c: closePrices, v: volumes, t: timestamps } = response.data;
    if (closePrices && volumes && timestamps) {
      const formattedData = timestamps.map((timestamp, index) => ({
        date: new Date(timestamp * 1000).toISOString().split('T')[0],
        price: closePrices[index].toFixed(2),
        volume: volumes[index],
      }));

      res.json(formattedData);
    } else {
      res.status(404).json({ error: 'No historical data found' });
    }
  } catch (error) {
    console.error('❌ Error fetching historical data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

// ✅ Fetch Market News
router.get('/news', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: { category: 'general', token: API_KEY },
    });

    const newsData = response.data.map((news) => ({
      title: news.headline,
      summary: news.summary,
      url: news.url,
      image: news.image,
    }));

    res.json(newsData);
  } catch (error) {
    console.error('❌ Error fetching market news:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch market news' });
  }
});

module.exports = router;
