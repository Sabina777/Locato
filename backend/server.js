const express = require('express');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require("./config/db"); 
// Initialize environment variables
dotenv.config();

// Create an Express app
const app = express();

// Connect to database
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Locato Backend is running');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
