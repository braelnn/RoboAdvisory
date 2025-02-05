import React from 'react';
import PropTypes from 'prop-types';
import './PortfolioOverview.css';

const PortfolioOverview = ({ portfolios = [] }) => {
  // Calculate totals
  const totalPortfolios = portfolios.length;
  const totalInvestment = portfolios.reduce(
    (sum, portfolio) => sum + parseFloat(portfolio.initialInvestment || 0),
    0
  );
  const totalReturns = portfolios.reduce(
    (sum, portfolio) => sum + parseFloat(portfolio.returns || 0),
    0
  );

  return (
    <div className="portfolio-overview">
      <div className="summary-card">
        <h3>Total Portfolios</h3>
        <p>{totalPortfolios}</p>
      </div>
      <div className="summary-card">
        <h3>Total Investment Value</h3>
        <p>${totalInvestment.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Total Returns</h3>
        <p>${totalReturns.toFixed(2)}</p>
      </div>
    </div>
  );
};

// PropTypes validation
PortfolioOverview.propTypes = {
  portfolios: PropTypes.arrayOf(
    PropTypes.shape({
      initialInvestment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      returns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

export default PortfolioOverview;
