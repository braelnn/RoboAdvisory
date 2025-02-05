import React, { useEffect, useState } from 'react';
import './Analytics.css';
import { fetchAnalyticsData } from '../Services/analyticsService';
import Header from '../components/Header';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load analytics data.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading analytics data...</p>;
  if (error) return <p className="error">{error}</p>;

  const {
    totalPortfolios,
    totalInvestmentValue,
    totalReturns,
    averageReturns,
    riskDistribution,
    performanceTrends,
    portfolios,
  } = analyticsData;

  // Chart data and options
  const lineChartData = {
    labels: performanceTrends.map((trend) => trend.name),
    datasets: performanceTrends.map((portfolio) => ({
      label: portfolio.name,
      data: portfolio.history.map((entry) => entry.value),
      borderColor: ' #0077B5',
      fill: false,
    })),
  };

  

  const barChartData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Risk Levels',
        data: [riskDistribution.low, riskDistribution.medium, riskDistribution.high],
        backgroundColor: [' #0077B5', '#00b4d8', '#90e0ef'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Chart' },
    },
  };

  return (
    <div className='analytic'>
      <Header />
    <div className="analytics-page">
      <header className="analytics-header">
        <h1>Portfolio Analytics</h1>
        
      </header>

      <div className="analytics-cards">
        <div className="analytics-card">
          <h3>Total Portfolios</h3>
          <p>{totalPortfolios}</p>
        </div>
        <div className="analytics-card">
          <h3>Total Investment Value</h3>
          <p>${totalInvestmentValue.toLocaleString()}</p>
        </div>
        <div className="analytics-card">
          <h3>Average Returns</h3>
          <p>${averageReturns.toFixed(2)}</p>
        </div>
        <div className="analytics-card">
          <h3>Risk Distribution</h3>
          <ul>
            <li>Low: {riskDistribution.low}</li>
            <li>Medium: {riskDistribution.medium}</li>
            <li>High: {riskDistribution.high}</li>
          </ul>
        </div>
      </div>

      {/* <div className="analytics-charts">
        <div className="analytics-chart">
          <h3>Performance Trends</h3>
          <AnaChart chartType="line" data={lineChartData} options={chartOptions} />
        </div>
        
        <div className="analytics-chart">
          <h3>Risk-Level Analysis</h3>
          <AnaChart chartType="bar" data={barChartData} options={chartOptions} />
        </div>
      </div> */}

      <div className="analytics-table">
        <h3>Historical Returns</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Initial Investment</th>
              <th>Returns</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio) => (
              <tr key={portfolio._id}>
                <td>{portfolio.name}</td>
                <td>${portfolio.initialInvestment.toLocaleString()}</td>
                <td>${portfolio.returns?.toLocaleString() || '0.00'}</td>
                <td>{portfolio.riskLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Analytics;
