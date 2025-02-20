import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PieChartIcon from "@mui/icons-material/PieChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShowChartIcon from "@mui/icons-material/ShowChart"; // Import new icon


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Portfolio Dashboard</h2>
      <ul>
        <li>
          <Link to="/portfoliomgmt">
            <DashboardIcon /> Portfolio Management
          </Link>
        </li>
        <li>
          <Link to="/allocation">
            <PieChartIcon /> Asset Allocation
          </Link>
        </li>
        
        
        <li>
          <Link to="/stocks">
            <TrendingUpIcon /> StockMarket Tracking
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
