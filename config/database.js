const Sequelize = require("sequelize");

// Create a connection pool
const db = new Sequelize("scrum", "root", "westcity", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db;
