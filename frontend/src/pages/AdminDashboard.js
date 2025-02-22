import React, { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUsers, FaBriefcase, FaChartLine, FaFileAlt } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import "../styles/AdminDashboard.css";

import { fetchUsers, deleteUser } from "../utilis/fetchUsers"; // Import API functions
import { fetchPortfolios,  } from "../utilis/fetchPortfolios"; // Import API functions
import { fetchAllReports } from "../utilis/fetchReports"; // Import API functions





const AdminDashboard = () => {
  const [showUsersTable, setShowUsersTable] = useState(false);
  const [users, setUsers] = useState([]);

  const [showPortfolioTable, setShowPortfolioTable] = useState(false);
  const [portfolios, setPortfolios] = useState([]);

  const [showReportsTable, setShowReportsTable] = useState(false);
  const [reports, setReports] = useState([]);

  const [showStatistics, setShowStatistics] = useState(false);

   // State for storing counts for charts
   const [usersCount, setUsersCount] = useState(0);
   const [portfoliosCount, setPortfoliosCount] = useState(0);
   const [reportsCount, setReportsCount] = useState(0);


  // Fetch users when the View Users card is clicked
  const handleViewUsers = async () => {
    setShowUsersTable(!showUsersTable);
    setShowPortfolioTable(false);
    setShowReportsTable(false);
    setShowStatistics(false);
    if (!showUsersTable) {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId)); // Remove user from UI
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    }
  };


  // Fetch portfolios when the View Portfolio card is clicked
  const handleViewPortfolios = async () => {
    setShowPortfolioTable(!showPortfolioTable);
    setShowUsersTable(false);
    setShowReportsTable(false);
    setShowStatistics(false);
  
    if (!showPortfolioTable) {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }
  
        const portfoliosData = await fetchPortfolios();
        setPortfolios(portfoliosData);
      } catch (error) {
        console.error("❌ Failed to fetch portfolios:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Failed to fetch portfolios. Please try again.");
      }
    }
  };
  


  const handleViewReports = async () => {
    setShowReportsTable(!showReportsTable);
    setShowUsersTable(false);
    setShowPortfolioTable(false);

    try {
        // ✅ Ensure portfolios are fetched
        let portfoliosData = portfolios;

        if (portfolios.length === 0) {
            console.log("Fetching portfolios before reports...");
            portfoliosData = await fetchPortfolios();
            setPortfolios(portfoliosData);

            if (portfoliosData.length === 0) {
                console.error("No portfolios found. Cannot fetch reports.");
                alert("No portfolios available. Please create a portfolio first.");
                return;
            }
        }

        // ✅ Fetch reports for all portfolios
        console.log("Fetching reports for all portfolios...");
        const reportsPromises = portfoliosData.map(portfolio => fetchAllReports(portfolio._id));

        // Wait for all report fetches to complete
        const reportsArray = await Promise.all(reportsPromises);

        // Flatten the array in case reports are returned in sub-arrays
        const allReports = reportsArray.flat();
        setReports(allReports);

        console.log("All reports fetched successfully.", allReports);
    } catch (error) {
        console.error("Failed to fetch reports", error);
        alert("Failed to fetch reports. Please try again.");
    }
};



  // Fetch statistics when the Statistics card is clicked
  const handleViewStatistics = async () => {
    setShowStatistics(!showStatistics);
    setShowUsersTable(false);
    setShowPortfolioTable(false);
    setShowReportsTable(false);

    if (!showStatistics) {
      try {
        // Fetch all data for statistics
        const usersData = await fetchUsers();
        const portfoliosData = await fetchPortfolios();
        
        // Ensure at least one portfolio exists before fetching reports
        let reportsData = [];
        if (portfoliosData.length > 0) {
          const portfolioId = portfoliosData[0]._id; // Fetch reports for first available portfolio
          reportsData = await fetchAllReports(portfolioId);
        }

        // Update state with real counts
        setUsersCount(usersData.length);
        setPortfoliosCount(portfoliosData.length);
        setReportsCount(reportsData.length);

      } catch (error) {
        console.error("❌ Error fetching statistics:", error);
        alert("Failed to fetch statistics. Please try again.");
      }
    }
  };

  // Chart Data
  const data = [
    { name: "Users", count: usersCount },
    { name: "Portfolios", count: portfoliosCount },
    { name: "Reports", count: reportsCount },
  ];

  // Colors for Pie Chart
  const COLORS = ["#007bff", "#28a745", "#ffc107"];


  return (
    <div className="adm">
      <Header />
      <div className="admin-dashboard">
        <h1 className="dashboard-heading">Admin Dashboard</h1>

        {/* First Row - Dashboard Cards */}
        <div className="cards-container">
          <div className="cards-container">
          <div className="dashboard-card" onClick={handleViewUsers}>
            <FaUsers className="dashboard-icon" />
            <h3>View Users</h3>
          </div>
        </div>

        <div className="cards-container">
          <div className="dashboard-card" onClick={handleViewPortfolios}>
            <FaBriefcase className="dashboard-icon" />
            <h3>View Portfolio</h3>
          </div>
        </div>

        <div className="cards-container">
          <div className="dashboard-card" onClick={handleViewReports}>
            <FaFileAlt className="dashboard-icon" />
            <h3>View Reports</h3>
          </div>
        </div>

        <div className="dashboard-card" onClick={handleViewStatistics}>
          <FaChartLine className="dashboard-icon" />
          <h3>Statistics</h3>
        </div>
        </div>

        {/* Second Row - Users Table */}
        {showUsersTable && (
          <div className="table-container">
            <h2 className="table-heading">All Users</h2>
            <div className="table-card">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.fullname}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Second Row - Portfolios Table */}
        {showPortfolioTable && (
          <div className="table-container">
            <h2 className="table-heading">All Portfolios</h2>
            <div className="table-card">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Portfolio Name</th>
                    <th>Amount</th>
                    <th>Risk Level</th>
                    <th>Allocations</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolios.length > 0 ? (
                    portfolios.map((portfolio) => (
                      <tr key={portfolio._id}>
                        <td>{portfolio.name}</td>
                        <td>${portfolio.amount}</td>
                        <td>{portfolio.riskLevel}</td>
                        <td>
                          {Object.entries(portfolio.allocations).map(([key, value]) => (
                            <span key={key}>{key}: {value}% </span>
                          ))}
                        </td>
                        <td>{new Date(portfolio.createdAt).toLocaleDateString()}</td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No portfolios found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Second Row - Reports Table */}
        {showReportsTable && (
          <div className="table-container">
            <h2 className="table-heading">All Reports</h2>
            <div className="table-card">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Summary</th>
                    <th>Value</th>
                    <th>Date</th>
                    <th>Portfolio ID</th>
                    <th>User ID</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length > 0 ? (
                    reports.map((report) => (
                      <tr key={report._id}>
                        <td>{report.title}</td>
                        <td>{report.summary}</td>
                        <td>${report.value}</td>
                        <td>{new Date(report.date).toLocaleDateString()}</td>
                        <td>{report.portfolioId}</td>
                        <td>{report.userId}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No reports found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Second Row - Bar Chart */}
        {showStatistics && (
          <div className="chart-container">
            <h2 className="chart-heading">Total Statistics Overview</h2>
            <div className="chart-card">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#007bff" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Statistics - Pie Chart */}
        {showStatistics && (
          <div className="chart-container">
            <h2 className="chart-heading">User, Portfolio & Report Distribution</h2>
            <div className="chart-card">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;