const Sequelize = require("sequelize");

// Create a connection pool
const DATABASE_URL = process.env.DATABASE_URL;
const db = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

// const db = new Sequelize('scrum', 'postgres', 'westcity', {
//   dialect: 'postgres',
// });

module.exports = db;
