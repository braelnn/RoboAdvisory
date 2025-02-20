const mongoose = require('mongoose');
const moment = require('moment-timezone');

const ReportSchema = new mongoose.Schema({
    title: String,
    summary: String,
    value: Number,  
    date: {
        type: Date,
        default: () => moment().tz('Africa/Nairobi').toDate() // Sets default time in EAT (UTC+3)
    },
    portfolioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' }, // Link to Portfolio
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Ensure that the date is always stored/retrieved in EAT
ReportSchema.methods.getFormattedDate = function () {
    return moment(this.date).tz('Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss');
};

module.exports = mongoose.model('Report', ReportSchema);
