import React, { useState, useEffect } from 'react';
import Reports from '../components/Reports';
import Notifications from '../components/Notifications';
import ToggleDarkMode from '../components/ToggleDarkMode';
import Preferences from '../components/Preferences';
import api from '../utilis/api';
import '../styles/reports.css';
import '../styles/reportscard.css';

import '../styles/notifications.css';
import '../styles/darkmode.css';
import '../styles/mainreport.css';

const ReportingNotificationsPage = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const response = await api.get('/portfolios');
                setPortfolios(response.data);

                if (response.data.length > 0) {
                    setSelectedPortfolio(response.data[0]); // Default to first portfolio
                }
            } catch (error) {
                console.error("Error fetching portfolios:", error);
            }
        };
        fetchPortfolios();
    }, []);

    return (
        <div className="reporting-notifications-page">
            {/* Top Section with Title and Dark Mode Toggle */}
            <div className="top-section">
                <h1>📊 Reporting & Notifications 🔔</h1>
                <ToggleDarkMode />
            </div>
            
            {/* User Preferences */}
            <Preferences />

            {/* Portfolio Selector */}
            <div className="portfolio-selector">
                <label>Select Portfolio:</label>
                <select 
                    value={selectedPortfolio?._id || ""}
                    onChange={(e) => setSelectedPortfolio(portfolios.find(p => p._id === e.target.value))}
                >
                    <option value="">-- Select Portfolio --</option>
                    {portfolios.map(portfolio => (
                        <option key={portfolio._id} value={portfolio._id}>
                            {portfolio.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Reports & Notifications */}
            <div className="grid-container">
                {selectedPortfolio ? (
                    <Reports selectedPortfolio={selectedPortfolio} />
                ) : (
                    <p>Please select a portfolio.</p>
                )}
                <Notifications />
            </div>
        </div>
    );
};

export default ReportingNotificationsPage;
