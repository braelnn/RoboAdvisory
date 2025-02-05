import React, { useState } from 'react';
import './PortfolioForm.css';

const PortfolioForm = ({ addPortfolio, closeForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    initialInvestment: '',
    riskLevel: '',
    goals: '',
  });

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields before submitting
    if (!formData.name || !formData.initialInvestment || !formData.riskLevel) {
      alert('Please fill in all required fields.');
      return;
    }

    // Calculate the returns (e.g., 10% of initial investment)
    const returns = parseFloat(formData.initialInvestment) * 0.1;

    // Create the initial history entry
    const historyEntry = [
      {
        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        value: parseFloat(formData.initialInvestment), // Convert initial investment to a number
        riskLevel: formData.riskLevel, // Risk level from the form
      },
    ];

    // Combine form data with the history entry and calculated returns
    const portfolioData = {
      name: formData.name,
      initialInvestment: parseFloat(formData.initialInvestment), // Ensure initialInvestment is a number
      riskLevel: formData.riskLevel,
      goals: formData.goals || '', // Optional field
      history: historyEntry, // Add initial history entry
      returns: returns.toFixed(2), // Add calculated returns
    };

    // Call the addPortfolio function with the combined data
    addPortfolio(portfolioData);

    // Reset the form fields
    setFormData({
      name: '',
      initialInvestment: '',
      riskLevel: '',
      goals: '',
    });

    // Close the form
    closeForm();
  };

  return (
    <form className="portfolio-form" onSubmit={handleSubmit}>
      <h2>Create Portfolio</h2>
      <input
        type="text"
        name="name"
        placeholder="Portfolio Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="initialInvestment"
        placeholder="Initial Investment"
        value={formData.initialInvestment}
        onChange={handleInputChange}
        required
      />
      <select
        name="riskLevel"
        value={formData.riskLevel}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Risk Level</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <textarea
        name="goals"
        placeholder="Investment Goals"
        value={formData.goals}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit">Save</button>
      <button type="button" onClick={closeForm}>
        Cancel
      </button>
    </form>
  );
};

export default PortfolioForm;
