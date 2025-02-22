import React, { useState, useEffect, useRef } from 'react';
import NotificationCard from './NotificationCard';
import { fetchNotifications } from '../utilis/fetchNotifications';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const socketRef = useRef(null); // ✅ Store WebSocket instance
    const clearNotificationsRef = useRef(null); // ✅ Store interval reference

    useEffect(() => {
        // ✅ Fetch initial notifications from API
        fetchNotifications().then(data => {
            if (Array.isArray(data)) {
                setNotifications(data);
            } else {
                console.error("❌ Error: Expected array but got", data);
            }
        });

        // ✅ Function to connect WebSocket
        const connectWebSocket = () => {
            socketRef.current = new WebSocket('ws://localhost:5000');

            socketRef.current.onopen = () => console.log("✅ WebSocket connected");
            socketRef.current.onerror = (error) => console.error("❌ WebSocket error:", error);
            socketRef.current.onclose = () => {
                console.log("❌ WebSocket disconnected. Attempting to reconnect...");
                setTimeout(connectWebSocket, 5000); // ✅ Reconnect after 5s if disconnected
            };

            socketRef.current.onmessage = (event) => {
                try {
                    const newNotification = JSON.parse(event.data);
                    setNotifications(prev => {
                        // ✅ Prevent duplicate notifications
                        if (!prev.find(n => n._id === newNotification._id)) {
                            return [newNotification, ...prev];
                        }
                        return prev;
                    });
                } catch (error) {
                    console.error("❌ Error parsing WebSocket message:", error);
                }
            };
        };

        connectWebSocket(); // ✅ Establish WebSocket connection

        // ✅ Automatically clear notifications every 10 minutes
        clearNotificationsRef.current = setInterval(() => {
            console.log("🕒 Clearing notifications...");
            setNotifications([]); // ✅ Empty the notifications array
        }, 600000); // 600,000ms = 10 minutes

        return () => {
            if (socketRef.current) {
                socketRef.current.close(); // ✅ Cleanup WebSocket on unmount
            }
            clearInterval(clearNotificationsRef.current); // ✅ Cleanup interval on unmount
        };
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
