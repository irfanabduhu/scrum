const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  pwd_hash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
});

module.exports = User;
