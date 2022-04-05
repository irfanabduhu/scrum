const Sequelize = require("sequelize");
const dotenv = require("dotenv");

// Create a connection pool
const DATABASE_URL = process.env.DATABASE_URL;
const db = new Sequelize(DATABASE_URL, {
  dialect: 'postgres'
});

// const db = new Sequelize('scrum', 'postgres', 'westcity', {
//   dialect: 'postgres',
// });

module.exports = db;
