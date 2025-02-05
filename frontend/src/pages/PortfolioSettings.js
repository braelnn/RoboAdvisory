import React, { useState } from 'react';
import './PortfolioSettings.css';

const PortfolioSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <section>
        <h3>Profile</h3>
        <button>Edit Profile</button>
        <button>Change Password</button>
      </section>

      <section>
        <h3>Portfolio Preferences</h3>
        <label>Default Currency:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </section>

      <section>
        <h3>Notifications</h3>
        <label>
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={() => setNotifications(!notifications)} 
          />
          Enable Notifications
        </label>
      </section>

      <section>
        <h3>Appearance</h3>
        <label>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
          Enable Dark Mode
        </label>
      </section>
    </div>
  );
};

export default PortfolioSettings;
