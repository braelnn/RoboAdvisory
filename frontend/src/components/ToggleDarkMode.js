import React, { useState } from 'react';

const ToggleDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <button onClick={toggleMode} className="toggle-btn">
            {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
};

export default ToggleDarkMode;
