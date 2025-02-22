require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const WebSocket = require("ws");
const axios = require("axios");
const connectDB = require("./config/db");
const Notification = require("./models/Notification");

// ✅ Import the notification utility
const { broadcastNotification } = require("./utils/notificationUtils");

// ✅ Finnhub API details
const API_KEY = "cu8oip1r01qgljare2g0cu8oip1r01qgljare2gg";
const BASE_URL = "https://finnhub.io/api/v1";

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const marketDataRoutes = require("./routes/marketDataRoutes");
const profileRoutes = require("./routes/profileRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const stockRoutes = require("./routes/stockRoutes");

// ✅ Initialize Express App
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/conts", contactRoutes);
app.use("/profile", profileRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/market-data", marketDataRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

// ✅ Create HTTP Server Before Using WebSocket
const server = http.createServer(app);


// ✅ WebSocket Server Setup
global.wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("✅ WebSocket connected");
    ws.send(JSON.stringify({ title: "Welcome!", message: "Connected to notifications" }));

    ws.on("close", () => console.log("❌ WebSocket disconnected"));
});

// ✅ Watch MongoDB for new notifications and broadcast them
Notification.watch().on("change", async (change) => {
    if (change.operationType === "insert") {
        const notification = change.fullDocument;
        broadcastNotification(notification);
    }
});

// ✅ Fetch market trends from Finnhub API every 1 minute
const fetchMarketTrends = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/quote`, {
            params: { symbol: "AAPL", token: API_KEY } // Example: Apple Stock
        });

        if (response.data && response.data.c) {
            const notification = await Notification.create({
                title: "Market Update",
                message: `Apple Stock: $${response.data.c} | Change: ${response.data.d}%`,
                type: "info",
            });

            // ✅ Broadcast market trend notification
            broadcastNotification(notification);
        }
    } catch (error) {
        console.error("❌ Error fetching market trends:", error);
    }
};

// ✅ Schedule market updates every 1 minute
setInterval(fetchMarketTrends, 60000);

// ✅ MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
