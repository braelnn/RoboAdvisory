const express = require('express');
const { getNotifications, createNotification } = require('../controllers/notificationController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getNotifications);
router.post('/', authMiddleware, createNotification);

module.exports = router;
