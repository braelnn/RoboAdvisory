const WebSocket = require("ws");
const Notification = require("../models/Notification");

// ✅ Function to broadcast notifications via WebSocket
const broadcastNotification = (notification) => {
    global.wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(notification));
        }
    });
};

// ✅ Function to create and send a notification
const sendNotification = async (title, message, type = "info", userId = null) => {
    try {
        const notification = await Notification.create({ title, message, type, userId });
        broadcastNotification(notification);
        return notification;
    } catch (error) {
        console.error("❌ Error sending notification:", error);
        return null;
    }
};

// ✅ Export functions
module.exports = {
    broadcastNotification,
    sendNotification,
};
