import React from 'react';

// ✅ Helper function to format timestamps
const formatTimestamp = (time) => {
    if (!time) return "Just now"; // Fallback for missing timestamps
    const date = new Date(time);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

// ✅ Map notification types to colors
const typeColors = {
    info: "#007bff",   // Blue
    alert: "#dc3545",  // Red
    warning: "#ffc107" // Yellow
};

const NotificationCard = ({ notification, isNew = false }) => {
    const { title, message, time, type = "info" } = notification;

    return (
        <div className="notification-card" style={{
            borderLeft: `5px solid ${typeColors[type] || "#6c757d"}`,
            background: isNew ? "#f8f9fa" : "#ffffff",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)"
        }}>
            <h3 style={{ color: typeColors[type] || "#333", marginBottom: "5px" }}>{title}</h3>
            <p style={{ fontSize: "14px", margin: "5px 0" }}>{message}</p>
            <span style={{ fontSize: "12px", color: "#666" }}>{formatTimestamp(time)}</span>
        </div>
    );
};

export default NotificationCard;
