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

User.hasMany(Board, { foreignKey: "owner_id", onDelete: "cascade" });

module.exports = Board;
