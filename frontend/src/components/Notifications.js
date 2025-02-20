import React, { useState, useEffect } from 'react';
import NotificationCard from './NotificationCard';
import { fetchNotifications } from '../utilis/fetchNotifications';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // ✅ Fetch initial notifications from API
        fetchNotifications().then(data => setNotifications(data));

        // ✅ WebSocket for real-time updates
        const socket = new WebSocket('ws://localhost:5000');

        socket.onmessage = (event) => {
            try {
                const newNotification = JSON.parse(event.data);
                setNotifications(prev => {
                    // ✅ Ensure unique notifications (no duplicates)
                    const updatedNotifications = [newNotification, ...prev];
                    return updatedNotifications.filter((item, index, self) =>
                        index === self.findIndex(n => n._id === item._id)
                    );
                });
            } catch (error) {
                console.error("❌ Error parsing WebSocket message:", error);
            }
        };

        socket.onopen = () => console.log("✅ WebSocket connected");
        socket.onerror = (error) => console.error("❌ WebSocket error:", error);
        socket.onclose = () => console.log("❌ WebSocket disconnected");

        return () => socket.close(); // ✅ Cleanup WebSocket on unmount
    }, []);

    return (
        <div className="notifications-section">
            <h2>🔔 Real-time Notifications</h2>
            <div className="notification-list">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <NotificationCard key={notification._id || notification.id} notification={notification} />
                    ))
                ) : (
                    <p>No new notifications</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;
