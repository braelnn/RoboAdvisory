import React, { useState, useEffect } from 'react';
import './MarketData.css';
import Header from '../components/Header';
import { getRealTimeData, getHistoricalData, getMarketNews } from '../Services/marketDataService';
import { FaChartLine, FaArrowUp, FaArrowDown, FaNewspaper } from 'react-icons/fa'; // Import Icons

const MarketData = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchInitialData() {
      const realTime = await getRealTimeData();
      const newsData = await getMarketNews();
      setRealTimeData(realTime);
      setNews(newsData);
    }
    fetchInitialData();
  }, []);

  return (
    <div className="market-data">
      <Header />

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
                <FaChartLine className="icon" />
                <h3>{asset.name} ({asset.symbol})</h3>
                <p><FaChartLine className="icon" /> Price: ${asset.price}</p>
                <p>
                  {asset.change > 0 ? <FaArrowUp className="icon positive" /> : <FaArrowDown className="icon negative" />}
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
