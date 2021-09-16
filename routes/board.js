const express = require("express");
const router = express.Router();

function dbFetchBoard(id) {}

function getBoard(board_id, user_id) {
  const board = dbFetchBoard(board_id);
  if (board == null) {
    return null; // board not found
  }
  if (!hasAccess(user_id, board_id)) {
    return null;
  }

  const tasks = fetchAllTask(board_id);
  const todo = tasks.filter((task) => task.status === "todo");
  const doing = tasks.filter((task) => task.status === "doing");
  const review = tasks.filter((task) => task.status === "review");
  const done = tasks.filter((task) => task.status === "done");

  return {
    board_title: board.title,
    todo: todo,
    doing: doing,
    review: review,
    done: done,
  };
}

function getRequesterId() {}

// @desc    Board
// @route   GET /board/:id
router.get("/:id", (req, res) =>
  res.render("board", getBoard(id, getRequesterId()))
);

module.exports = router;
