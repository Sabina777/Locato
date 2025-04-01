const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, // Set to true to see SQL queries in the console
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error(' Database connection failed:', error);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
