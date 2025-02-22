import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaChartLine, FaBriefcase } from "react-icons/fa";
import "../styles/DashboardPortfolio.css";
import Header from "../components/Header"
import Footer from "../components/Footer";

const DashboardPortfolio = () => {
  const [selectedPage, setSelectedPage] = useState(null);

  return (
    <div className="dashport">
        <Header />   
        <div className="dashboard-container">
        <div className="cards-container">
            {/* Portfolio Management Card */}
            <div className="card" onClick={() => setSelectedPage("portfoliomgmt")}>
            <FaBriefcase className="icon" />
            <h2>Portfolio Management</h2>
            <p>
                Manage your investment portfolio with real-time asset allocation, 
                performance tracking, and financial analysis tools.
            </p>
            </div>

            {/* Stock Market Tracking Card */}
            <div className="card" onClick={() => setSelectedPage("stocks")}>
            <FaChartLine className="icon" />
            <h2>Stock Market Tracking</h2> 
            <p>
                Stay informed with real-time stock market trends, analytics, 
                and insights to make smarter financial decisions.
            </p>
            </div>
        </div>

        {/* Display Links Below Cards */}
        <div className="links-container">
            {selectedPage === "portfoliomgmt" && (
            <Link to="/portfoliomgmt" className="page-link">PortfolioManagement</Link>
            )}
            {selectedPage === "stocks" && (
            <Link to="/stocks" className="page-link">Stocks Market Tracking</Link>
            )}
        </div>

        {/* Content Outlet */}
        <div className="content">
            <Outlet />
        </div>
        </div>
        <Footer />
    </div>
  );
};

export default DashboardPortfolio;
