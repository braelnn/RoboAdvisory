const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: String,
    message: String,
    type: { type: String, enum: ['info', 'warning', 'alert'] },
    time: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Notification', NotificationSchema);
