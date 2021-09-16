const Sequelize = require("sequelize");

// Create a connection pool
const sequelize = new Sequelize("scrum", "root", "westcity", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
