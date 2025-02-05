require('dotenv').config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes')
const portfolioRoutes = require('./routes/portfolioRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const marketDataRoutes = require('./routes/marketDataRoutes');



dotenv.config();
connectDB();
console.log("Mongo URI:", process.env.MONGO_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/conts", contactRoutes);
app.use("/portf", portfolioRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/market-data', marketDataRoutes);



mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


