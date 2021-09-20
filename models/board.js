const Sequelize = require("sequelize");
const db = require("../config/database");
const User = require("../models/user");

const Board = db.define("board", {
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

User.hasMany(Board, { foreignKey: "owner_id", onDelete: "cascade" });

// Access: many-to-many relationship
User.belongsToMany(Board, {
  through: "has_access",
  foreignKey: "user_id",
  onDelete: "cascade",
});
Board.belongsToMany(User, {
  through: "has_access",
  foreignKey: "board_id",
  onDelete: "cascade",
});

module.exports = Board;
