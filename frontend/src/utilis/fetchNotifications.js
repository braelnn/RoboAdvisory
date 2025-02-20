import api from './api';

export const fetchNotifications = async () => {
    try {
        const response = await api.get('/notifications');
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
};

export const createNotification = async (notificationData) => {
    try {
        const response = await api.post('/notifications', notificationData);
        return response.data;
    } catch (error) {
        console.error('Error creating notification:', error);
        return null;
    }
};
