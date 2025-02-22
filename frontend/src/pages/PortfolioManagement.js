import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } from "../Services/portService";
import "../styles/PortfolioManagement.css";
import { FaChartLine, FaDollarSign, FaExclamationTriangle, FaEdit, FaTrash } from "react-icons/fa";

const PortfolioManagement = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [formData, setFormData] = useState({ name: "", amount: "", riskLevel: "Low" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Add loading state

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const response = await getPortfolios();
      if (response.error) {
        console.error("❌ Error fetching portfolios:", response.error);
        alert("Failed to fetch portfolios.");
      } else {
        setPortfolios(response);
      }
    } catch (error) {
      console.error("❌ Unexpected error fetching portfolios:", error);
      alert("An unexpected error occurred.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      if (editId) {
        const response = await updatePortfolio(editId, formData);
        if (response.error) {
          alert(response.error);
          return;
        }
        setEditId(null);
      } else {
        const response = await createPortfolio(formData);
        if (response.error) {
          alert(response.error);
          return;
        }
      }

      setFormData({ name: "", amount: "", riskLevel: "Low" });
      fetchPortfolios();
    } catch (error) {
      console.error("❌ Error saving portfolio:", error);
      alert("An error occurred while saving the portfolio.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (portfolio) => {
    setFormData({ name: portfolio.name, amount: portfolio.amount, riskLevel: portfolio.riskLevel });
    setEditId(portfolio._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this portfolio?")) return;

    setLoading(true);
    try {
      const response = await deletePortfolio(id);
      if (response.error) {
        alert(response.error);
        return;
      }
      fetchPortfolios();
    } catch (error) {
      console.error("❌ Error deleting portfolio:", error);
      alert("Failed to delete portfolio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portmgnt">
      <Header />
      <div className="page">
        {/* Create Portfolio Card */}
        <div className="create-portfolio-container">
          <div className="create-portfolio-card">
            <h2>{editId ? "Edit Portfolio" : "Create Portfolio"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Investment Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />

              <label>Investment Amount ($):</label>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} />

              <label>Risk Level:</label>
              <select name="riskLevel" value={formData.riskLevel} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : editId ? "Update Portfolio" : "Add Portfolio"}
              </button>
            </form>
          </div>
        </div>

        {/* Portfolio Cards */}
        <div className="port">
          <h3>List of Portfolios</h3>
          {loading && <p>Loading portfolios...</p>}
          <div className="portfolio-grid">
            {portfolios.map((portfolio) => (
              <div 
                className={`portfolio-card ${editId === portfolio._id ? "editing" : ""}`} 
                key={portfolio._id}
              >
                <div className="portfolio-header">
                  <FaChartLine className="icon" /> 
                  <h4>{portfolio.name}</h4>
                </div>

                <p><FaDollarSign className="icon" /> Amount: ${portfolio.amount}</p>
                <p>
                  <FaExclamationTriangle className={`risk-icon ${portfolio.riskLevel.toLowerCase()}`} />
                  Risk Level: {portfolio.riskLevel}
                </p>

                {/* Allocations */}
                <div className="allocations">
                  <h5>Allocations</h5>
                  {Object.keys(portfolio.allocations || {}).map((asset) => (
                    <p key={asset}>{asset}: ${portfolio.allocations[asset].toFixed(2)}</p>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="portfolio-actions">
                  <button className="edit-btn" onClick={() => handleEdit(portfolio)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(portfolio._id)} disabled={loading}>
                    <FaTrash /> {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioManagement;
