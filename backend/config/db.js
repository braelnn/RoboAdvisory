const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI); // Debugging purpose
    await mongoose.connect(process.env.MONGO_URI); // Simplified connection
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

