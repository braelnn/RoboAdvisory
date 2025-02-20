import React from 'react';

const NotificationCard = ({ notification }) => {
    return (
        <div className="notification-card">
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            <span className="timestamp">{notification.time}</span>
        </div>
    );
};

export default NotificationCard;
