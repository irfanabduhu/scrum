const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const {DBNAME, DBADMIN, DBPASS, DBHOST} = process.env;

// Create a connection pool
const db = new Sequelize("scrum", "postgres", "westcity", {
  dialect: 'postgres',
  // host: DBHOST,
  // port: 3306,
});

module.exports = db;
