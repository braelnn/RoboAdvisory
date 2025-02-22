const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id })
            .sort({ time: -1 }); // ✅ Sort by newest first
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching notifications' });
    }
};

exports.createNotification = async (req, res) => {
    try {
        const { title, message, type } = req.body;
        const notification = await Notification.create({ title, message, type, userId: req.user.id });

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Error creating notification' });
    }
};
