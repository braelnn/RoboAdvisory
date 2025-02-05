import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import PortfolioOverview from '../components/PortfolioOverview';
import PortfolioList from '../components/PortfolioList';
import PortfolioForm from '../components/PortfolioForm';
import PortfolioDetails from '../components/PortfolioDetails';
import {
  getPortfolios,
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
  addPortfolioHistory,
} from '../Services/portfolioService';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch all portfolios on component load
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await getPortfolios();
        setPortfolios(data);
      } catch (err) {
        console.error('Error fetching portfolios:', err);
      }
    };
    fetchPortfolios();
  }, []);

  // Add a new portfolio
  const addPortfolio = async (newPortfolio) => {
    try {
      // Create the portfolio
      const createdPortfolio = await createPortfolio(newPortfolio);

      // Add initial history entry
      const historyEntry = [
        {
          date: new Date().toISOString().split('T')[0], // Current date
          value: parseFloat(newPortfolio.initialInvestment), // Investment value
          riskLevel: newPortfolio.riskLevel, // Risk level
        },
      ];
      await addPortfolioHistory(createdPortfolio._id, historyEntry);

      // Refresh the portfolio list
      const updatedPortfolios = await getPortfolios();
      setPortfolios(updatedPortfolios);

      setShowForm(false); // Close the form
    } catch (err) {
      console.error('Error adding portfolio:', err);
    }
  };

  // Delete a portfolio by ID
  const deletePortfolioById = async (id) => {
    try {
      await deletePortfolio(id);
      setPortfolios(portfolios.filter((portfolio) => portfolio._id !== id)); // Update frontend state
    } catch (err) {
      console.error('Error deleting portfolio:', err);
    }
  };

  // Edit a portfolio by ID
  const editPortfolio = async (id, updatedData) => {
    try {
      const updatedPortfolio = await updatePortfolio(id, updatedData);
      setPortfolios(
        portfolios.map((portfolio) =>
          portfolio._id === id ? updatedPortfolio : portfolio
        )
      );
    } catch (err) {
      console.error('Error updating portfolio:', err);
    }
  };

  

  return (
    <div className="portfolio-page">
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <button
          className="toggle-sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? '←' : '→'}
        </button>
        {sidebarOpen && (
          <nav>
            <ul>
            <li><a href="/portfolio">Dashboard</a></li>
            <li><a href="/analytics">Analytics</a></li>
            <li><a href="/port-setting">Settings</a></li>
            <li><a href="/contacts">Contact Us</a></li>
            </ul>
          </nav>
        )}
      </aside>
      <main className="portfolio-main-content">
        <header className="portfolio-header">
          <h1>Portfolio Management</h1>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create New Portfolio'}
          </button>
        </header>
        <div className="portfolio-container">
          <PortfolioOverview portfolios={portfolios} />
          {showForm && (
            <PortfolioForm
              addPortfolio={addPortfolio}
              closeForm={() => setShowForm(false)}
            />
          )}
          {selectedPortfolio ? (
            <PortfolioDetails
              portfolio={selectedPortfolio}
              closeDetails={() => setSelectedPortfolio(null)}
            />
          ) : (
            <PortfolioList
              portfolios={portfolios}
              viewPortfolio={setSelectedPortfolio}
              deletePortfolio={deletePortfolioById}
              editPortfolio={editPortfolio} // Pass the editPortfolio function

            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
