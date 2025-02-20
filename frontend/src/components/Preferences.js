import React, { useState, useEffect } from 'react';
import '../styles/preferences.css';

const Preferences = () => {
    const [preferences, setPreferences] = useState({
        notifications: true,
        marketAlerts: true,
        reportFrequency: 'weekly',
    });

    // Load preferences from localStorage on mount
    useEffect(() => {
        const savedPreferences = JSON.parse(localStorage.getItem('userPreferences'));
        if (savedPreferences) {
            setPreferences(savedPreferences);
        }
    }, []);

    // Save preferences to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
    }, [preferences]);

    // Handle changes in preferences
    const handleToggle = (e) => {
        const { name, checked } = e.target;
        setPreferences((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSelectChange = (e) => {
        setPreferences((prev) => ({ ...prev, reportFrequency: e.target.value }));
    };

    return (
        <div className="preferences-panel">
            <h3>⚙️ User Preferences</h3>

            <div className="preference-item">
                <label>📩 Enable Notifications:</label>
                <input
                    type="checkbox"
                    name="notifications"
                    checked={preferences.notifications}
                    onChange={handleToggle}
                />
            </div>

            <div className="preference-item">
                <label>📈 Market Alerts:</label>
                <input
                    type="checkbox"
                    name="marketAlerts"
                    checked={preferences.marketAlerts}
                    onChange={handleToggle}
                />
            </div>

            <div className="preference-item">
                <label>📊 Report Frequency:</label>
                <select value={preferences.reportFrequency} onChange={handleSelectChange}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            
        </div>
    );
};

export default Preferences;
