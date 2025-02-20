require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http"); // ✅ Import http
const WebSocket = require("ws"); // ✅ Import WebSocket
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const marketDataRoutes = require("./routes/marketDataRoutes");
const profileRoutes = require("./routes/profileRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const stockRoutes = require("./routes/stockRoutes");

// ✅ Initialize Express App First
const app = express();

// ✅ Move dotenv & DB connection to the top
connectDB();
console.log("Mongo URI:", process.env.MONGO_URI);

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
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("✅ WebSocket connected");
    ws.send(JSON.stringify({ title: "Welcome!", message: "Connected to portfolio notifications" }));

    ws.on("message", (message) => {
        const notification = JSON.parse(message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(notification));
            }
        });
    });

    ws.on("close", () => console.log("❌ WebSocket disconnected"));
});

// ✅ MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
