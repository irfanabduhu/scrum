const Sequelize = require("sequelize");
const db = require("../config/database");
const Board = require("../models/board");

const Task = db.define("task", {
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
    type: Sequelize.ENUM("todo", "doing", "review", "done"),
    allowNull: false,
  },
});

Board.hasMany(Task, { foreignKey: "board_id", onDelete: "cascade" });

module.exports = Task;
