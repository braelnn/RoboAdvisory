import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import { useReactToPrint } from "react-to-print";
import "./Reports.css";
import Header from "../components/Header";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Reports = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef(null); // Attach a reference to the printable content

  useEffect(() => {
    axios.get("http://localhost:5000/analytics") // Adjust backend URL if necessary
      .then((response) => {
        setAnalytics(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
        setLoading(false);
      });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => reportRef.current, // Ensure the reference is correctly attached
    documentTitle: "Investment_Report",
    onBeforeGetContent: () => {
      if (!reportRef.current) {
        alert("Report data is still loading. Please wait.");
        return;
      }
    },
  });

  if (loading) {
    return <div className="loading">Loading Reports...</div>;
  }

  if (!analytics) {
    return <div className="error-message">Failed to load reports. Please try again later.</div>;
  }

  return (
    <div className="Reports">
      <Header />
      <div className="reports-container">
        <h2 className="reports-title">Investment Reports & Insights</h2>

        {/* ✅ Print Button (Only Visible on Screen) */}
        {/* <button className="print-btn" onClick={handlePrint}>Print as PDF</button> */}

        {/* ✅ Wrap everything inside reportRef for printing */}
        <div ref={reportRef} className="report-content">
          {/* KPI Metrics Section */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <h3>Total Portfolios</h3>
              <p>{analytics.totalPortfolios}</p>
            </div>
            <div className="kpi-card">
              <h3>Total Investment</h3>
              <p>${analytics.totalInvestmentValue.toLocaleString()}</p>
            </div>
            <div className="kpi-card">
              <h3>Total Returns</h3>
              <p>${analytics.totalReturns.toLocaleString()}</p>
            </div>
            <div className="kpi-card">
              <h3>Average Returns</h3>
              <p>{analytics.averageReturns.toFixed(2)}%</p>
            </div>
          </div>

          {/* ✅ Risk Distribution Pie Chart */}
          <div className="chart-container">
            <h3>Risk Distribution</h3>
            <Pie data={{
              labels: ["Low Risk", "Medium Risk", "High Risk"],
              datasets: [
                {
                  data: [
                    analytics.riskDistribution.low,
                    analytics.riskDistribution.medium,
                    analytics.riskDistribution.high
                  ],
                  backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
                },
              ],
            }} />
          </div>

          {/* ✅ Performance Trends Line Chart */}
          <div className="chart-container">
            <h3>Historical Performance Trends</h3>
            <Line data={{
              labels: analytics.performanceTrends.map((portfolio) => portfolio.name),
              datasets: analytics.performanceTrends.map((portfolio) => ({
                label: portfolio.name,
                data: portfolio.history.map((entry) => entry.value),
                borderColor: "#0077B5",
                borderWidth: 2,
                fill: false,
              })),
            }} />
          </div>

          {/* ✅ Portfolio Reports */}
          <h3 className="section-title">Individual Portfolio Reports</h3>
          <div className="portfolio-grid">
            {analytics.portfolios.map((portfolio) => (
              <div key={portfolio._id} className="portfolio-card">
                <h4>{portfolio.name}</h4>
                <p><strong>Initial Investment:</strong> ${portfolio.initialInvestment.toLocaleString()}</p>
                <p><strong>Risk Level:</strong> {portfolio.riskLevel}</p>
                <p><strong>Returns:</strong> ${portfolio.returns.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
