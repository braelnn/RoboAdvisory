import api from './api';

const socket = new WebSocket('ws://localhost:5000'); // ✅ WebSocket for real-time notifications

// ✅ Fetch existing notifications
export const fetchNotifications = async () => {
    try {
        const response = await api.get('/notifications');
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching notifications:', error.response?.data || error.message);
        return { error: 'Failed to load notifications', data: [] };
    }
};

// ✅ Create a new notification (also broadcasts via WebSocket)
export const createNotification = async (notificationData) => {
    try {
        const response = await api.post('/notifications', notificationData);

        // ✅ Send notification via WebSocket for real-time updates
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        console.error('❌ Error creating notification:', error.response?.data || error.message);
        return { error: 'Failed to create notification', data: null };
    }
};

// ✅ WebSocket Listener for Real-Time Updates
export const subscribeToNotifications = (callback) => {
    socket.onmessage = (event) => {
        try {
            const newNotification = JSON.parse(event.data);
            callback(newNotification); // Pass new notifications to frontend
        } catch (error) {
            console.error("❌ Error parsing WebSocket message:", error);
        }
    };

    socket.onopen = () => console.log("✅ WebSocket connected to notifications");
    socket.onerror = (error) => console.error("❌ WebSocket error:", error);
    socket.onclose = () => console.log("❌ WebSocket disconnected");
};
