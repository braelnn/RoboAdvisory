import React, { useEffect, useState } from 'react';
import './PortfolioDetails.css';
import Chart from './Chart';
import { getPortfolioById } from '../Services/portfolioService';

const PortfolioDetails = ({ portfolio, closeDetails }) => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolioById(portfolio._id);
        setPortfolioData(data);
      } catch (err) {
        console.error('Error fetching portfolio details:', err);
      }
    };
    if (portfolio) {
      fetchPortfolio();
    }
  }, [portfolio]);

  if (!portfolioData) {
    return (
      <div className="portfolio-details">
        <p>Loading portfolio details...</p>
        <button onClick={closeDetails}>Back to List</button>
      </div>
    );
  }

  return (
    <div className="portfolio-details">
      <h2>{portfolioData.name}</h2>
      <p>Risk Level: {portfolioData.riskLevel}</p>
      <p>Initial Investment: ${portfolioData.initialInvestment}</p>
      <p>Goals: {portfolioData.goals}</p>
      <Chart history={portfolioData.history || []} />
      <button onClick={closeDetails}>Back to List</button>
    </div>
  );
};

export default PortfolioDetails;
