import React, { useState } from "react";
import axios from "axios";
import "../styles/StockMarket.css";
import { FaSearch, FaChartLine, FaArrowUp, FaArrowDown, FaPlayCircle, FaStopCircle, FaExclamationCircle } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/stocks";

const StockMarket = () => {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState("");

  const handleFetchStock = async () => {
    if (!symbol.trim()) {
      setError("Please enter a valid stock symbol.");
      return;
    }

    setError(""); 
    setStockData(null); 

    console.log(`🔵 Fetching stock data from: ${API_URL}/${symbol}`);

    try {
      const response = await axios.get(`${API_URL}/${symbol}`);
      
      console.log("✅ API Response:", response.data); 

      if (response.data && response.data.symbol) {
        setStockData(response.data);
      } else {
        console.error("❌ Stock data is missing or invalid:", response.data);
        setError("Stock data not found. Try another symbol.");
      }
    } catch (err) {
      console.error("❌ Stock Fetch Error:", err);
      setError("Error fetching stock data. Check your connection.");
    }
  };

  return (
    <div className="page">
      <div className="stock-card">
        <h2><FaChartLine className="icon" /> Real-Time Market Data</h2>

        {/* Stock Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter Stock Symbol (e.g., AAPL, TSLA)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase().trim())}
          />
          <button onClick={handleFetchStock}>
            <FaSearch /> Get Stock Price
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="error"><FaExclamationCircle className="error-icon" /> {error}</p>}

        {/* Display Stock Data */}
        {stockData && (
          <div className="stock-info">
            <h3>{stockData.symbol}</h3>
            <p><FaChartLine className="icon" /> <strong>Current Price:</strong> ${stockData.currentPrice || "N/A"}</p>
            <p><FaArrowUp className="icon" /> <strong>High:</strong> ${stockData.highPrice || "N/A"}</p>
            <p><FaArrowDown className="icon" /> <strong>Low:</strong> ${stockData.lowPrice || "N/A"}</p>
            <p><FaPlayCircle className="icon" /> <strong>Open:</strong> ${stockData.openPrice || "N/A"}</p>
            <p><FaStopCircle className="icon" /> <strong>Previous Close:</strong> ${stockData.previousClose || "N/A"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockMarket;
