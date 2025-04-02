
require('module-alias/register');
const express = require('express');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require("./config/db"); 
const storeRoutes = require('./routes/storeRoute');
const reviewRoutes = require('./routes/reviewRoute');
const userRoutes = require('./routes/userRoute');
const cors = require('cors'); 

// Initialize environment variables
dotenv.config();

// Create an Express app
const app = express();

app.use(cors()); // Allow all origins by default

// Connect to database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', storeRoutes);
app.use('/api', reviewRoutes);
app.use('/api', userRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
