import React, { useState, useEffect } from "react";
import { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } from "../Services/portService";
import "../styles/PortfolioManagement.css";
import { FaChartLine, FaDollarSign, FaExclamationTriangle, FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const PortfolioManagement = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [formData, setFormData] = useState({ name: "", amount: "", riskLevel: "Low" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const data = await getPortfolios();
      setPortfolios(data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      alert("Please fill out all fields");
      return;
    }

    try {
      if (editId) {
        await updatePortfolio(editId, formData);
        setEditId(null);
      } else {
        await createPortfolio(formData);
      }

      setFormData({ name: "", amount: "", riskLevel: "Low" });
      fetchPortfolios();
    } catch (error) {
      console.error("Error saving portfolio:", error);
    }
  };

  const handleEdit = (portfolio) => {
    setFormData({ name: portfolio.name, amount: portfolio.amount, riskLevel: portfolio.riskLevel });
    setEditId(portfolio._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      try {
        await deletePortfolio(id);
        fetchPortfolios();
      } catch (error) {
        console.error("Error deleting portfolio:", error);
      }
    }
  };

  return (
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

            <button type="submit">{editId ? "Update Portfolio" : "Add Portfolio"}</button>
          </form>
        </div>
      </div>

      {/* Portfolio Cards */}
      <div className="port">
        <h3>List of Portfolios</h3>
      <div className="portfolio-grid">
        {portfolios.map((portfolio) => (
          <div className="portfolio-card" key={portfolio._id}>
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
              <button className="delete-btn" onClick={() => handleDelete(portfolio._id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default PortfolioManagement;
