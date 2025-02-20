const cron = require('node-cron');
const Report = require('../models/Report');

cron.schedule('0 0 * * 1', async () => { // Runs every Monday at midnight
    console.log('⏰ Generating weekly reports...');
    const users = await User.find();

    users.forEach(async (user) => {
        await Report.create({
            title: 'Weekly Investment Report',
            summary: 'Your weekly portfolio performance update.',
            value: Math.random() * 10000, // Simulating data
            userId: user._id
        });
    });

    console.log('✅ Weekly reports generated!');
});
