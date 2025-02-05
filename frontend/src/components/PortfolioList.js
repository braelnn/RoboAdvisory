import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PortfolioList.css';

const PortfolioList = ({ portfolios = [], viewPortfolio, deletePortfolio, editPortfolio }) => {
  const [editingPortfolioId, setEditingPortfolioId] = useState(null); // Track which portfolio is being edited
  const [formData, setFormData] = useState({}); // Track form data for editing

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (portfolio) => {
    setEditingPortfolioId(portfolio._id);
    setFormData({
      name: portfolio.name,
      initialInvestment: portfolio.initialInvestment,
      riskLevel: portfolio.riskLevel,
    });
  };

  const handleSaveClick = async () => {
    await editPortfolio(editingPortfolioId, formData);
    setEditingPortfolioId(null); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditingPortfolioId(null); // Exit edit mode
  };

  return (
    <div className="portfolio-list">
      <h2>Displayed Portfolios</h2>
      {portfolios.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Initial Investment</th>
              <th>Risk Level</th>
              <th>Returns</th>
              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio) =>
              editingPortfolioId === portfolio._id ? (
                <tr key={portfolio._id}>
                  {/* Edit Mode */}
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="initialInvestment"
                      value={formData.initialInvestment}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <select
                      name="riskLevel"
                      value={formData.riskLevel}
                      onChange={handleInputChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={portfolio._id}>
                  {/* View Mode */}
                  <td>{portfolio.name}</td>
                  <td>${portfolio.initialInvestment}</td>
                  <td>{portfolio.riskLevel}</td>
                  <td>${portfolio.returns || 0}</td> {/* Display returns */}

                  <td>
                    <button onClick={() => viewPortfolio(portfolio)}>View</button>
                    <button onClick={() => deletePortfolio(portfolio._id)}>Delete</button>
                    <button onClick={() => handleEditClick(portfolio)}>Edit</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>No portfolios available.</p>
      )}
    </div>
  );
};

PortfolioList.propTypes = {
  portfolios: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      initialInvestment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      riskLevel: PropTypes.string.isRequired,
    })
  ),
  viewPortfolio: PropTypes.func.isRequired,
  deletePortfolio: PropTypes.func.isRequired,
  editPortfolio: PropTypes.func.isRequired,
};

export default PortfolioList;
