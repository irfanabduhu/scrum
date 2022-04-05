const Sequelize = require("sequelize");

// Create a connection pool
const db = new Sequelize('scrum', 'postgres', 'westcity', {
  dialect: 'postgres',
});

module.exports = db;
