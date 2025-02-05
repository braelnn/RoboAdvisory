import React, { useState, useEffect } from 'react';
import './MarketData.css';
import { getRealTimeData, getHistoricalData, getMarketNews } from '../Services/marketDataService';

const MarketData = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRange, setSelectedRange] = useState('7d');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Fetch real-time market data and news
    async function fetchInitialData() {
      const realTime = await getRealTimeData();
      const newsData = await getMarketNews();
      setRealTimeData(realTime);
      setNews(newsData);
    }
    fetchInitialData();
  }, []);

  const handleSearch = async () => {
    if (searchTerm) {
      const data = await getHistoricalData(searchTerm, selectedRange);
      setHistoricalData(data);
    }
  };

  return (
    <div className="market-data">
     
      

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>Market Data Integration</h1>
          <p>Real-time and historical insights into asset performance.</p>
        </header>

        {/* Real-Time Data */}
        <section>
          <h2>Real-Time Market Data</h2>
          <div className="card-container">
            {realTimeData.map((asset) => (
              <div key={asset.symbol} className="card">
                <img src={asset.image} alt={asset.symbol} />
                <h3>{asset.name} ({asset.symbol})</h3>
                <p>Price: ${asset.price}</p>
                <p>
                  Change: <span className={asset.change > 0 ? 'positive' : 'negative'}>
                    {asset.change} ({asset.percentChange}%)
                  </span>
                </p>
                <p>High: ${asset.high}</p>
                <p>Low: ${asset.low}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        {/* <section>
          <h2>Search and Filter</h2>
          <input
            type="text"
            placeholder="Enter ticker symbol"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => setSelectedRange(e.target.value)}>
            <option value="7d">Past 7 Days</option>
            <option value="1m">Past 1 Month</option>
            <option value="1y">Past 1 Year</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </section> */}

        {/* Historical Data */}
        {/* <section>
          <h2>Historical Data</h2>
          {historicalData.length > 0 && (
            <div className="card-container">
              {historicalData.map((data, index) => (
                <div key={index} className="card">
                  <h3>Date: {data.date}</h3>
                  <p>Price: ${data.price}</p>
                  <p>Volume: {data.volume}</p>
                </div>
              ))}
            </div>
          )}
        </section> */}

        {/* Market News */}
        <section>
          <h2>Market News</h2>
          <div className="card-container">
            {news.map((article, index) => (
              <div key={index} className="card">
                <img src={article.image} alt={article.title} />
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketData;
