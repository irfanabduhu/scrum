const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Board = require("./board");

const Task = sequelize.define("task", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Task.hasOne(Board, { as: "board_id", foreignKey: "id" });

module.exports = Task;
