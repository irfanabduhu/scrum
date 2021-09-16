const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Board = sequelize.define("board", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Board.hasOne(User, { as: "owner_id", foreignKey: "id" });

module.exports = Board;
