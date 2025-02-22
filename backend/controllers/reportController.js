const WebSocket = require("ws"); // ✅ Import WebSocket
const Report = require('../models/Report');
const Portfolio = require('../models/Portfolio');
const Notification = require('../models/Notification');

// ✅ Ensure WebSocket server exists
const broadcastNotification = (notification) => {
    if (!global.wss) {
        console.error("❌ WebSocket server (wss) is not initialized.");
        return;
    }

    global.wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) { // ✅ No more "WebSocket is not defined" error
            client.send(JSON.stringify(notification));
        }
    });
};

// 📌 Get Reports for a Specific Portfolio
const getPortfolioReports = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const reports = await Report.find({ portfolioId });
        res.status(200).json(reports);
    } catch (error) {
        console.error("❌ Error fetching reports:", error);
        res.status(500).json({ error: 'Error fetching reports' });
    }
};

const getReportsByPortfolio = async (req, res) => {
    try {
        let { portfolioId } = req.params;

        // Validate and convert portfolioId to ObjectId
        if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
            return res.status(400).json({ error: "Invalid Portfolio ID" });
        }

        const reports = await Report.find({ portfolioId: new mongoose.Types.ObjectId(portfolioId) });

        if (!reports.length) {
            return res.status(404).json({ message: "No reports found for this portfolio." });
        }

        res.status(200).json(reports);
    } catch (error) {
        console.error("❌ Error fetching reports:", error);
        res.status(500).json({ error: "Server error while fetching reports" });
    }
};

// 📌 Create Report & Trigger Notification
const createPortfolioReport = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const { title, summary, value } = req.body;

        console.log(`📢 Creating report for ${portfolio.name} with data:`, req.body);

        const newReport = await Report.create({
            title,
            summary,
            value,
            portfolioId: portfolio._id,
            userId: req.user.id // ✅ Ensure the report is linked to the user
        });

        console.log(`✅ Report saved in DB:`, newReport);

        // ✅ Create Notification for the report
        const notification = await Notification.create({
            title: "Report Generated",
            message: `A new report "${title}" has been generated for portfolio "${portfolio.name}".`,
            type: "info",
            userId: req.user.id
        });

        // ✅ Broadcast the notification via WebSocket
        broadcastNotification(notification);

        res.status(201).json(newReport);
    } catch (error) {
        console.error('❌ Error creating report:', error);
        res.status(500).json({ error: 'Server error while creating report' });
    }
};

module.exports = { getPortfolioReports, createPortfolioReport, getReportsByPortfolio };
